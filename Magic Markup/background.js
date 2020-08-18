   //response to the messsage sent from popup.js snapshot icon click
   var screenshot = {
       //create an empty canvas for passing new data url result
    content : document.createElement("canvas"),
    data : '',
  
    init : function() {
      this.initEvents();
    },
   saveScreenshot : function() {
      var image = new Image();
      image.onload = function() {
        var canvas = screenshot.content;
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
  
        // automatically saves the image as png file
        var link = document.createElement('a');
        link.download = "download.png";
        link.href = screenshot.content.toDataURL();
        link.click();
        screenshot.data = '';
      };
      image.src = screenshot.data; 
    },
  initEvents : function() {
  chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
          if (request.greeting == "take screenshot") {
            chrome.tabs.captureVisibleTab(null, {format : "png"}, function(data) { //grabs page data url
                  screenshot.data = data; 
                  screenshot.saveScreenshot(); //calls function to save the data img url
  
              }); 
  
          }
          return true; //to prevent closing port
      });   
    }
  };
  //calls screenshot anonymous function
  screenshot.init();