let pwadetectDOM = document.getElementById('pwadetect');
document.getElementById('jstext').innerHTML = '我要測試PWA 安裝偵測 v1';
// var vConsole = new VConsole();
let deferredPrompt;
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log("This is running as standalone.");
  pwadetectDOM.innerText = 'This is running as standalone.';
  pwadetectDOM.style.color = 'lightgreen';
  // var vConsole = new VConsole();
} else {
  pwadetectDOM.innerText = 'This is running as normal mode.';
  pwadetectDOM.style.color = 'lightblue';
}

window.addEventListener('popstate', (event) => {
  quityes();
});

const xhrGenerator = ({ url, data }) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(data);
    xhttp.onreadystatechange = function fianlly() {
      let responseText;
      try {
        responseText = (this.readyState == 4 && this.response) ? JSON.parse(this.response) : '';
      } catch (e) {
        console.error(e)
      }
      if (this.readyState == 4 && this.status == 200) {
        resolve(responseText);
      }
      if (this.readyState == 4 && this.status !== 200) {
        reject(responseText);
      }
    }
  })
}

const getInnerHeight = () => {
  let targetHeight;
  switch (window.orientation) {
    case 90:
    case -90:
      targetHeight = (window.innerWidth - window.innerHeight > 0) ? window.innerHeight : window.innerWidth;
      break;
    default:
      targetHeight = (window.innerWidth - window.innerHeight > 0) ? window.innerWidth : window.innerHeight;
  }
  return targetHeight;
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  console.info('beforeinstallprompt!!');
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  document.getElementById('promotionInfo').style.display = 'block';
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

window.addEventListener('appinstalled', () => {
  console.log('PWA Installed.')
});

const showiframe = function() {
  return xhrGenerator({
    url: '/api/game/launchUrl/demo',
    data: JSON.stringify({
      deviceType: 0,
      domain: document.location.origin,
      gameBranch: "JDB",
      gameId: 4790,
      gameLang: "th",
    })
  })
  .then(({ data }) => {
    document.getElementById('lunchGameWrapper').style.display = 'block';
    document.getElementById('lunchGameWrapper').style.height = `${getInnerHeight()}px`;
    document.getElementById('webframe').src = data.gameLaunch;
    document.getElementById('webframe').height = getInnerHeight();
  })
  .catch((e) => {
    console.log(e);
  })
}

const showiframeWithFull = function() {
  showiframe()
  .then(() => {
    console.log('fullscreen??')
    document.getElementById('webframe').requestFullscreen()
  });
}

const backBtnTrigger = function() {
  document.getElementById('webframeBackButton').style.display = 'none';
  document.getElementById('confirmDialog').style.display = 'block';
}

const quityes = function() {
  document.getElementById('lunchGameWrapper').style.display = 'none';
  document.getElementById('confirmDialog').style.display = 'none';
  document.getElementById('webframeBackButton').style.display = 'block';
  document.getElementById('webframe').src = '';
}

const quitno = function() {
  document.getElementById('webframeBackButton').style.display = 'block';
  document.getElementById('confirmDialog').style.display = 'none';
}

window.addEventListener("orientationchange", function(e) {
  document.getElementById('webframe').height = getInnerHeight();
  document.getElementById('lunchGameWrapper').style.height = `${getInnerHeight()}px`;
  document.getElementById('orientationdetect').innerHTML = window.orientation;
});

