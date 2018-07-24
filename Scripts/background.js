const channelUrl = "https://gaming.youtube.com/user/theCHAIZYchannel/live";

localStorage.isLive = false;

var myAlarm = {
    delayInMinutes: 1,
    periodInMinutes: 1
};

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
    var currentTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
    });

    chrome.notifications.create('onlineNotification', {
        type: 'basic',
        title: 'TTD Notifier',
        message: 'Hampton Brandon is live.',
        contextMessage: currentTime,
        iconUrl: "/icon/128_Red.png",
        requireInteraction: true
    });
}

const checkIsLive = function () {
    $.get('https://suspects.me/api/streamer/hmptn/stream', function (data) {
        console.log(data);

        if (data.error) {
            console.log("Streamer not found");
        } else if (data.data && data.data.isLive) {
            if (JSON.parse(localStorage.isLive) === false) {
                console.log("Brandon is online");
                displayNotificaton();
                localStorage.isLive = true;

                chrome.browserAction.setIcon({
                    "path": "/icon/16_Red.png"
                });
            }
        } else {
            console.log("Brandon is offline");
            localStorage.isLive = false;

            chrome.browserAction.setIcon({
                "path": "/icon/128_Black.png"
            });
        }

        //updateIcon();
    });
}

checkIsLive();