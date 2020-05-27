let pwadetectDOM = document.getElementById('pwadetect');
document.getElementById('jstext').innerHTML = '我要測試彈窗功能 v1';
let deferredPrompt;
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log("This is running as standalone.");
  pwadetectDOM.innerText = 'This is running as standalone.';
  pwadetectDOM.style.color = 'lightgreen';
} else {
  pwadetectDOM.innerText = 'This is running as normal mode.';
  pwadetectDOM.style.color = 'lightblue';
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  console.info('beforeinstallprompt!!');
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  // document.getElementById('promotionInfo').style.display = 'block';
});

document.getElementById('promotionInfo').addEventListener('click', (e) => {
  // Hide the app provided install promotion
  document.getElementById('promotionInfo').style.display = 'none';
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
});

const showiframe = function() {
  document.getElementById('lunchGameWrapper').style.display = 'block';
  // document.getElementById('webframe').src = '';
  document.getElementById('webframe').src = 'https://game.jdb168.net/?lang=th&isHiddenCloseIcon=1&origin=&isAPP=false&d=1&gameType=8&mType=8048&gName=OpenSesameII_f1b503e&e=jdb168&more=1&mute=0&x=e9tkQRED2CABTGFfK6IMPqhtbzMrTJRk8_PyR81NWNAQWKlEmQh8WCIK-1CelNAHfYNZ-HA8ZVjQsUuDUfvS3KUkABYLxia4UnD6H3pRCAACDcrkt21D6lLswmXvH-iDXPD4Cty6hS0';
  document.getElementById('webframe').height = '200px';
}

const hideiframe = function() {
  document.getElementById('lunchGameWrapper').style.display = 'none';
  document.getElementById('webframe').src = '';
}

window.addEventListener("orientationchange", function(e) {
  // let targetHeight = (window.innerWidth - window.innerHeight > 0) ? "window.innerWidth" : "window.innerHeight";
  // document.getElementById('orientationdetect').innerHTML = window.orientation + ':' + window.innerHeight + '****' + targetHeight + '****';
  // document.getElementById('orientationdetect').innerHTML = screen.availHeight;
  let targetHeight;
  switch (window.orientation) {
    case 90:
    case -90:
      targetHeight = (window.innerWidth - window.innerHeight > 0) ? window.innerHeight : window.innerWidth;
      break;
    default:
      targetHeight = (window.innerWidth - window.innerHeight > 0) ? window.innerWidth : window.innerHeight;
  }
  document.getElementById('orientationdetect').innerHTML = window.orientation + ':' + window.innerHeight + '****' + targetHeight + '****';
});
