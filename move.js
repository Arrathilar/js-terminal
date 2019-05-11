
const windowElement = document.getElementById('title');

windowElement.onmousedown = function(e) { 

  windowElement.style.position = 'absolute';
  moveAt(e);

  document.body.appendChild(windowElement);

  windowElement.style.zIndex = 1000; 


  function moveAt(e) {
    windowElement.style.left = e.pageX - windowElement.offsetWidth / 2 + 'px';
    windowElement.style.top = e.pageY - windowElement.offsetHeight / 2 + 'px';
  }


  document.onmousemove = function(e) {
    moveAt(e);
  }

  windowElement.onmouseup = function() {
    document.onmousemove = null;
    windowElement.onmouseup = null;
  }
}