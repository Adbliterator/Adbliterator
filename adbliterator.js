chrome.storage.local.get(null, async (config) => {

    function getElementsCN(class_name) {
        return document.getElementsByClassName(class_name)[0];
    }

    function getSideAds() {
        var sideAd1 = getElementsCN("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement");
        var sideAd2 = getElementsCN("style-scope ytd-item-section-renderer sparkles-light-cta");
        var newSideAd1 = getElementsCN("style-scope ytd-ad-slot-renderer");

        // New Ad System
        var newSideAd2 = document.evaluate(
            '//*[@id="panels"]',
            document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null,
        ).singleNodeValue;
        
        return [sideAd1, sideAd2, newSideAd1, newSideAd2];
    }

    setInterval(() => {
        if(config['uselessytfeatures-enabled'] === true) {
            var voiceSearch = document.getElementById("voice-search-button");
            var banner = document.getElementById("big-yoodle");
    
            voiceSearch?.remove(); // Removes youtubes Voice Search feature no one uses.
            banner?.remove();
        }

        var inputElement = document.querySelector('#search-input input');
        inputElement?.setAttribute('placeholder', 'Search (Adbliterator V1.0.7 by the adblit Team)');
        
        var video = getElementsCN("video-stream html5-main-video");

        if(video !== undefined && config['adblock-enabled'] === true) {
            var ad = getElementsCN("video-ads ytp-ad-module"); 
            var sideAds = getSideAds();
            var skipButton = getElementsCN("ytp-ad-text ytp-ad-skip-button-text");
            var incomingAd = getElementsCN("ytp-ad-message-container");
            var popup = document.getElementById("style-scope ytd-popup-container");
            var slotRemove = getElementsCN("style-scope ytd-ad-slot-renderer");
            var companion = getElementsCN("style-scope ytd-companion-slot-renderer");
            var merch = getElementsCN("style-scope ytd-merch-shelf-renderer");
            var skipButton = getElementsCN("ytp-ad-text ytp-ad-skip-button-text");

            if(ad && ad.children.length > 0) {
                if(Number.isFinite(video.duration) && video.currentTime < (video.duration - 0.5)) {
                    video.currentTime = video.duration - 0.5;

                    chrome.storage.local.get('blocked-youtube-ads', (data) => {
                        var current_blocked_ads =  data['blocked-youtube-ads'] || 0
                        chrome.storage.local.set({ 'blocked-youtube-ads': current_blocked_ads + 1 })
                    });
                }

                video.playbackRate = 16;
                video.volume = 0;
                skipButton?.click();
                console.log('[Adblock]: Skipped ad.');

                /*for(let i = 0; i < ad.children.length; i++) {
                    ad.children[i].remove(); // Doesn't seem to get detected, needs further testing though.
                }*/
            }

            sideAds.forEach((sideAd) => {
                sideAd?.remove(); // Loops through all side ads it finds and removes them from the page.
            });
            
            var closeAbleAds = document.getElementsByClassName("ytp-ad-overlay-close-button");
            for(let i = 0; i < closeAbleAds.length; i++){
                closeAbleAds[i].click();
            }

            incomingAd?.remove() // Removes YT Ad message Container
            popup?.remove(); // stops the popup from appearing
            slotRemove?.remove(); // Removes the ad slot
            companion?.remove(); // Removes the companion
            merch?.remove(); // Removes the merch from videos

            //var homeButton = document.querySelector('.title.style-scope.ytd-guide-entry-renderer');
            //homeButton?.textContent = 'Adbliterator Online!';
        }
    }, 100);
});