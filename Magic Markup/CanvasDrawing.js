//content script that works with DOM
chrome.runtime.onMessage.addListener(function(request, sender, sendRespose){ //listens for the passed variable color value
  if(request.greeting == "theColorAction" || request.greeting == "theRangeAction" ||  request.greeting == "theStopAction" ){
    
    collectData();
    
};
function collectData() {
  chrome.storage.local.get(["theColor","theRange","theStop"], function (items){
    //console.log(items.theColor, items.theRange,items.theStop);  show data
  
      let isDrawing = false;
      let x = 0;
      let y = 0;

      //canvas container
      var canvasContainer = document.createElement('div');
      canvasContainer.setAttribute("id","canvasDiv");
      var element = document.getElementById("canvasDiv");
      document.body.appendChild(canvasContainer);

      // if stop button is pressed then clear canvas and make web page responsive.
      // need to fix to avoid having to click multiple times to clear everything
      if(items.theStop == false){
        element.remove();
        document.body.style.cursor = "auto";
        return;
      };

      canvasContainer.style.position = 'absolute';
      canvasContainer.style.left = '0px';
      canvasContainer.style.top = '0px';
      canvasContainer.style.width ='100%'; 
      canvasContainer.style.height ='100%';


      let pageContainer = document.body;
      
      // gets max scroll height even if no scroll bar used on page.
      //fix bug for pages that load new content upon scrolling down.
      let ScrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight,

      );
      
      //create canvas
      var myCanvas = document.createElement("canvas");
      myCanvas.setAttribute("id","myCanvas");
      myCanvas.style.width= pageContainer.scrollWidth+"px";
      myCanvas.style.height=ScrollHeight+"px";
      myCanvas.width = pageContainer.scrollWidth;
      myCanvas.height = ScrollHeight;
      myCanvas.style.overflow = 'visible';
      myCanvas.style.position = "absolute";
      myCanvas.style.zIndex = "2030034534533";
      
      var context = myCanvas.getContext('2d');

      canvasContainer.appendChild(myCanvas);

      // Add the event listeners for drawing
      myCanvas.addEventListener('mousedown', e => {      
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
        
      });

      myCanvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
          draw(context, x, y, e.offsetX, e.offsetY);
          x = e.offsetX;
          y = e.offsetY;
        };
      });

      window.addEventListener('mouseup', e => {                
        if (isDrawing === true) {
          draw(context, x, y, e.offsetX, e.offsetY);          
          x = 0;
          y = 0;
          isDrawing = false;
          
        };
        
      });
       
  
      //draw
      function draw(context, x1, y1, x2, y2) {
        pageContainer.style.cursor = "cell";

        context.beginPath();
        context.strokeStyle  = items.theColor; 
        context.lineWidth = items.theRange;
        context.shadowColor = items.theColor;
        context.shadowBlur = 1;  
        context.save();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineCap = "round"; // smooth out the drawing
        context.lineCap = "round";
        context.stroke();  
        context.closePath();
      };
      //clear canvas
      chrome.runtime.onMessage.addListener(function(request, sender, sendRespose){
        if(request.greeting == "theClearAction"){
        chrome.storage.local.get(["theClear"], function (items){
          clearCanvas();
        });
      };
      });

      function clearCanvas(){
        context.beginPath();
        context.clearRect(0,0, myCanvas.width, myCanvas.height);

      };

});
  };


}); 