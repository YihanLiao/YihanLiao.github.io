let pwadetectDOM = document.getElementById('pwadetect');
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log("This is running as standalone.");
  pwadetectDOM.innerText = 'This is running as standalone.';
  pwadetectDOM.style.color = 'lightgreen';
} else {
  pwadetectDOM.innerText = 'This is running as normal mode.';
  pwadetectDOM.style.color = 'lightblue';
}

