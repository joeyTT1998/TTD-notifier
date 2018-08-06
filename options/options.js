window.addEventListener('load', function (){
    options.playSound.checked = JSON.parse(localStorage.playNotificationSound)

    options.playSound.onchange = function () {
        localStorage.playNotificationSound = options.playSound.checked;
    };
});