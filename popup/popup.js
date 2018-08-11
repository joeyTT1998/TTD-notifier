document.getElementById("options").addEventListener("click", openOptions);

var getLastSeen = function () {
    let hours = ((new Date().getTime() - (new Date(localStorage.lastSeen)).getTime()) / (1000 * 60 * 60));
    let mins = (hours * 10) * 6 + 3;

    if (hours < 1.0) {
        return Math.round(mins) + "m ago";
    } else if (hours >= 24) {
        return "~" + Math.floor(hours / 24) + "d ago";
    } else {
        return Math.round(hours) + "h ago";
    }
}

var updateOnlineStatus = function () {
    if (JSON.parse(localStorage.isLive)) {
        document.getElementById("last-seen").style.display = "none";
    } else {
        document.getElementById("last-seen").textContent = "Last seen: " + getLastSeen();
        document.getElementById("live-status").style.display = "none";
    }
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

document.addEventListener('DOMContentLoaded', function () {
    updateOnlineStatus();
});