window.addEventListener('load', function (){
    options.playSound.checked = JSON.parse(localStorage.playNotificationSound);
    volumeRange.value = JSON.parse(localStorage.notificationVol);
    volumeLabel.value = JSON.parse(localStorage.notificationVol);
});

options.playSound.onchange = function () {
    localStorage.playNotificationSound = options.playSound.checked; 
};

volumeRange.onchange = function() {
    localStorage.notificationVol = volumeRange.value;
    volumeLabel.value = volumeRange.value;
}
