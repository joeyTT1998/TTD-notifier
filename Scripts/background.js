const channelUrl = "https://gaming.youtube.com/user/theCHAIZYchannel/live";

var notificationSound = new Audio("sounds/live.mp3");

localStorage.setItem("isLive", false);
localStorage.setItem("playNotificationSound", true);
localStorage.setItem("notificationVol", 35);
localStorage.setItem("iconTheme", 0);

const myAlarm = {
    delayInMinutes: 1,
    periodInMinutes: 1
};

chrome.alarms.create("liveCheckTimer", myAlarm);
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "liveCheckTimer") {
        checkIfLive();
    }
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    chrome.tabs.create({
        url: channelUrl
    });

    chrome.notifications.clear(notificationId);
});

chrome.contextMenus.create({
    id: "notifSound",
    title: "Play notification sound",
    type: "checkbox",
    checked: JSON.parse(localStorage.playNotificationSound),
    contexts: ["browser_action"],
    onclick: function () {
        localStorage.playNotificationSound = !JSON.parse(localStorage.playNotificationSound);
    }
});

const displayNotificaton = function () {
    let currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });

    if (JSON.parse(localStorage.playNotificationSound) === true) {
        notificationSound.volume = JSON.parse(localStorage.notificationVol) / 100;
        notificationSound.play();
    }

    chrome.notifications.create("onlineNotification", {
        type: "basic",
        title: "TTD Notifier",
        message: "Hampton Brandon is live.",
        contextMessage: currentTime,
        iconUrl: "/icon/128_Red.png",
        requireInteraction: true
    });
}

chrome.browserAction.setBadgeBackgroundColor({
    "color": "red"
});

const updateBadge = function (message) {
    chrome.browserAction.setBadgeText({
        "text": message
    });
}

const updateIcon = function () {
    console.log(JSON.parse(localStorage.isLive));
    let iconPath = JSON.parse(localStorage.isLive) ? "/icon/128_Red.png" : "/icon/128_Black.png";

    chrome.browserAction.setIcon({
        "path": iconPath
    });
}

const checkIfLive = function () {
    fetch("https://suspects.me/api/streamer/hmptn/stream")
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            console.log(res);
            if (res.error) {
                console.error(res.message || "Streamer not found");
            } else if (res.data && res.data.isLive) {
                if (JSON.parse(localStorage.isLive) === false) {
                    console.log("Brandon is online");
                    localStorage.isLive = true;
                    updateBadge("LIVE!");

                    displayNotificaton();
                }
            } else {
                console.log("Brandon is offline");
                localStorage.isLive = false;
                localStorage.lastSeen = res.data.lastUpdate;
                updateBadge("");
            }
        });
}

checkIfLive();