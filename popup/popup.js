document.getElementById("options").addEventListener("click", openOptions);

var getLastSeen = function() {
    let hours = ((new Date().getTime() - (new Date(localStorage.lastSeen)).getTime()) / (1000 * 60 * 60));
    let mins = (hours * 10) * 6 + 3;

    if(hours < 1.0){
        return Math.round(mins) + "m ago";
    }
    else if(hours >= 24){
        return Math.round(hours / 24) + "d ago";
    }
    else {
        return Math.round(hours)+ "h ago";
    }
}

var updateOnlineStatus = function() {
    let liveStatus = document.getElementById("live-status");
    let lastSeenStatus = document.getElementById("last-seen");

    console.log(getLastSeen());
    if (JSON.parse(localStorage.isLive)) {
        lastSeenStatus.style.display = "none";
    } else {
        lastSeenStatus.textContent = "Last Seen: " + getLastSeen();
        liveStatus.style.display = "none";
    }
}

function openOptions(){
    chrome.runtime.openOptionsPage();
}

document.addEventListener('DOMContentLoaded', function () {
    updateOnlineStatus();
});