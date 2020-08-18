//interacts with popup only
// use message passing to interact with DOM injectable files
var drawCanvas = document.getElementById('but1');
var clearCanvas = document.getElementById("but7");
var flag = true;
var scnsht = false;

document.getElementById("Color").onchange = changeColor;
document.getElementById("range").onchange = changeSize;

function changeColor(e){
  Color = this.value;

}

function changeSize(e){
  range = this.value;
 
}

//drop down menu for shape icon
document.getElementById("but2").addEventListener('click', function myFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
});

window.onclick = function(event){
  if(!event.target.matches('.dropbtn')){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for(i=0; i < dropdowns.length; i++){
      var openDropdown = dropdowns[i];
      if(openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      };
    };
  };
};

//draw and change color and size on icon click and color and size change
drawCanvas.onclick = function(undefined){
  flag = true;
  chrome.storage.local.set({
    "theColor": Color
  });
  chrome.storage.local.set({
    "theRange": range
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.executeScript(tabs[0].id, {file: "CanvasDrawing.js"}, function(){
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "theColorAction", greeting: "theRangeAction"});
});
});
};

//stop drawing on icon click
chrome.storage.local.set({
  "theStop" : flag
});
document.getElementById("but8").addEventListener('click', function(){
  flag = false;

  chrome.storage.local.set({
  "theStop" : flag
});  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.executeScript(tabs[0].id, {file: "CanvasDrawing.js"}, function(){
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "theStopAction"});      
});
});
});

//clear canvas drawing on icon click 
clearCanvas.onclick = function(undefined){
  chrome.storage.local.set({
    "theClear" : clearCanvas
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.executeScript(tabs[0].id, {file: "CanvasDrawing.js"}, function(){
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "theClearAction"});
      });
    });
};


// Listen for a click on the camera icon. On that click, take a screenshot.
  chrome.storage.local.set({
    "theShot" : scnsht
  });
  document.getElementById("but5").addEventListener('click', function(){
    scnsht = true;
  chrome.storage.local.set({
    "theShot" : scnsht
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.runtime.sendMessage({greeting: "take screenshot"},function(response) {
      });
});
});


