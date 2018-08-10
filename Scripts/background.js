const channelUrl = "https://gaming.youtube.com/user/theCHAIZYchannel/live";

var notificationSound = new Audio("sounds/live.mp3");

localStorage.isLive = false;
localStorage.playNotificationSound = true;
localStorage.notificationVol = 40;

var myAlarm = {
    delayInMinutes: 1,
    periodInMinutes: 1
};

chrome.browserAction.setBadgeBackgroundColor({
    "color": "red"
});

chrome.alarms.create("liveCheckTimer", myAlarm);
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "liveCheckTimer") {
        checkIsLive();
    }
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    chrome.tabs.create({
        url: channelUrl
    });

    chrome.notifications.clear(notificationId);
});

const displayNotificaton = function () {
    let currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });

    if(JSON.parse(localStorage.playNotificationSound) === true){
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

const checkIsLive = function () {
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
                }
            } else {
                console.log("Brandon is offline");
                localStorage.isLive = false;
                localStorage.lastSeen = res.data.lastUpdate;

                updateBadge("");
            }
        });

}

checkIsLive();
