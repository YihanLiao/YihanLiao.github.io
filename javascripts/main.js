let pwadetectDOM = document.getElementById('pwadetect');
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log("This is running as standalone.");
  pwadetectDOM.innerText = 'This is running as standalone.';
  pwadetectDOM.style.color = 'lightgreen';
} else {
  pwadetectDOM.innerText = 'This is running as normal mode.';
  pwadetectDOM.style.color = 'lightblue';
}

const showiframe = function() {
  document.getElementById('lunchGameWrapper').style.display = 'block';
  // document.getElementById('webframe').src = '';
  document.getElementById('webframe').src = 'https://game.jdb168.net/?lang=th&isHiddenCloseIcon=1&origin=&isAPP=false&d=1&gameType=8&mType=8048&gName=OpenSesameII_f1b503e&e=jdb168&more=1&mute=0&x=e9tkQRED2CABTGFfK6IMPqhtbzMrTJRk8_PyR81NWNAQWKlEmQh8WCIK-1CelNAHfYNZ-HA8ZVjQsUuDUfvS3KUkABYLxia4UnD6H3pRCAACDcrkt21D6lLswmXvH-iDXPD4Cty6hS0';
  document.getElementById('webframe').height = window.innerHeight;
}

const hideiframe = function() {
  document.getElementById('lunchGameWrapper').style.display = 'none';
  document.getElementById('webframe').src = '';
}