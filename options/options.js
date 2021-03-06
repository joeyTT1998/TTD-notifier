window.addEventListener('load', function () {
    options.playSound.checked = JSON.parse(localStorage.playNotificationSound);
    volumeRange.value = JSON.parse(localStorage.notificationVol);
    volumeLabel.value = JSON.parse(localStorage.notificationVol);
    document.getElementById("iconTheme").selectedIndex = localStorage.iconTheme;
});

document.getElementById("btnClose").addEventListener("click", function () {
    window.close();
});

options.playSound.onchange = function () {
    localStorage.playNotificationSound = options.playSound.checked;

    chrome.contextMenus.update("notifSound", {
        checked: JSON.parse(localStorage.playNotificationSound),
    });
};

volumeRange.oninput = function () {
    localStorage.notificationVol = volumeRange.value;
    volumeLabel.value = volumeRange.value;
}

document.getElementById("iconTheme").addEventListener("change", function () {
    let iconPath = this.selectedIndex == 0 ? "/icon/128_Black.png" : "/icon/128_White.png";

    chrome.browserAction.setIcon({
        "path": iconPath
    });

    localStorage.iconTheme = this.selectedIndex;
});