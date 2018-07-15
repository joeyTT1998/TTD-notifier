var channelUrl = "https://gaming.youtube.com/user/theCHAIZYchannel/live";
var live = 0;
var myAlarm = {
    delayInMinutes: 5,
    periodInMinutes: 5
};

var myNotification = {
    type: "basic",
    iconUrl: "/icon/TTD_Red_16.png",
    message: "Hampton Brandon is live",
    title: "TTD notification",
    requireInteraction: true
};

chrome.alarms.create("timer1", myAlarm);
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "timer1") {
        search();
    }
});

search();

function search() {
    var data = {
        channelId: 'UCUHzH3aSxoa9wRudh4V1H-A',
        eventType: 'live',
        key: "AIzaSyD-fqEPrCcCoDUAu6LMAzjsWGgkoiwbVPk",
        type: 'video',
        order: 'viewCount',
        part: 'snippet'
    };

    $.get("https://www.googleapis.com/youtube/v3/search", data, function (response) {
        results = response.items;

        if (results.length == 0) {
            console.log('Hampton Brandon is offline now');
            chrome.browserAction.setIcon({
                "path": "/icon/TTD_Black_16.png"
            });

            live = 0;
        } else {
            if (live === 0) {
                chrome.notifications.create(channelUrl, myNotification);
                chrome.notifications.onClicked.addListener(function (notificationId) {
                    chrome.tabs.create({
                        url: notificationId
                    });

                    chrome.notifications.clear(channelUrl);
                });

                chrome.browserAction.setIcon({
                    "path": "/icon/TTD_Red_16.png"
                });

                live = 1;
            }
        }
    });

}
