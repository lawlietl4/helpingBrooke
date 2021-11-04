let filePath = document.getElementById('fileInput');
var el1 = document.getElementById('info1');
var el2 = document.getElementById('info2');
var el3 = document.getElementById('info3');
var el4 = document.getElementById('info4');
var el5 = document.getElementById('info5');
var el6 = document.getElementById('out1');
let apiCallNum = ''; 
let numAPI = '';
let APIAvgCall = '';
let apiNames = '';
let apiNameAndCalls = '';

function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

// read text input
function readText(filePath) {
    var output = ""; //placeholder for text output
    if (filePath.files && filePath.files[0]) {
        reader.onload = function (e) {
            // get file contents
            output = (e.target.result);
            // turn those contents to JSON
            const JSONOut = JSON.parse(output);
            // parse the JSON object so that its contents are String
            apiCallNum = JSON.stringify(JSONOut['Number Of API Calls']);
            numAPI = JSON.stringify(JSONOut['Number Of APIs']);
            APIAvgCall=(JSON.stringify(JSONOut['Average Calls Per API']));
            apiNames = (JSON.stringify(JSONOut['API Names']));
            apiNameAndCalls = (JSON.stringify(JSONOut["API Names and Calls"]));
            // console.log(JSONOut[0]);
            // call the method that desplays to the HTML side
            
                console.log(window.location.pathname);
            if(window.location.pathname == '/'){
                displayContents("Number of API Calls: "+apiCallNum," Number of APIs: "+numAPI," Average of API Calls: "+APIAvgCall,'API Names: '+apiNames,'API Names and Calls: '+apiNameAndCalls);
                // main page display
            }
            else if (window.location.pathname == '/secondpage.html'){
                displayContents2(apiNameAndCalls,numAPI); // second page display method
            }
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else if (ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            file.Close(); //close file "input stream"
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' +
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
            }
        }
    }
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }
    return true;
}

function displayContents(txt1,txt2,txt3,txt4,txt5) {
    el1.innerHTML = txt1;
    el2.innerHTML = txt2;
    el3.innerHTML = txt3;// these are referencing the element vars at the top of file
    el4.innerHTML=txt4;
    el5.innerHTML=txt5;
}

function displayContents2(txt1){
    console.log(apiNames);
    el2.innerHTML = apiNameAndCalls; // need element that matches this variable element's name in the second page
    el6.innerHTML = txt1;
}