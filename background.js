// 1: Create the right-click menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyCleanLink",
        title: "copyCleanLink",
        contexts: ["link"]
    });
});

// 2: The logic to strip tracking params
function cleanUrl(originalUrl) {
    try {
        const url = new URL(originalUrl);
        const trashParams = [
            "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", // Google
            "fbclid", "igshid", "ttclid", // Meta & TikTok
            "gclid", "mc_eid", "msclkid", // Ads
            "si", "feature", // YouTube
            "list", "index"
        ];
        trashParams.forEach(param => url.searchParams.delete(param));

        return url.toString();
    } catch (e) {
        return originalUrl;
    }
}

// 3: Listen for the click on the menu item 
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyCleanLink" && tab.id) {
        const cleaned = cleanUrl(info.linkUrl);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (before, after) => {
                alert("BEFORE:\n" + before + "\n\nAFTER:\n" + after);
                console.log("BEFORE:\n" + before + "\n\nAFTER:\n" + after);

                navigator.clipboard.writeText(after).then(() => {
                    const notify = document.createElement('div');
                    notify.textContent = "Link cleaned and copied!";
                    Object.assign(notify.style, {
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        padding: '12px 20px',
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        zIndex: '9999',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'opacity 0.5s ease'
                    });
                    // Add it to the page
                    document.body.appendChild(notify);
                    // Remove after 2 secs
                    setTimeout(() => {
                        notify.style.opacity = '0';
                        setTimeout(() => notify.remove(), 500);
                    }, 2000);

                    console.log("Link cleaned and copied!");
                });
            },
        args: [info.linkUrl, cleaned]
        });
    }
});