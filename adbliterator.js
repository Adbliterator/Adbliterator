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
            var fuckPremium = document.querySelector('a[href="/paid_memberships?ybp=mAEK"]');
            var banner = document.getElementById("big-yoodle");
    
            if (voiceSearch !== null) voiceSearch.remove(); // Removes youtubes Voice Search feature no one uses.
            if (fuckPremium !== null) fuckPremium.remove(); // Removes premium element.
            if (banner !== null) banner.remove(); // idk lol, what banner? ig u do this comment
        }

        var inputElement = document.querySelector('#search-input input');
        if(inputElement !== null) inputElement.setAttribute('placeholder', 'Search (Adbliterator V1.0.5 by the adblit Team)');
        
        

        var video = getElementsCN("video-stream html5-main-video");

        if(video !== undefined && config['allowytads-enabled'] === false) {
            var ad = getElementsCN("video-ads ytp-ad-module"); 
            var sideAds = getSideAds();
            var skipButton = getElementsCN("ytp-ad-text ytp-ad-skip-button-text");
            var incomingAd = getElementsCN("ytp-ad-message-container");
            var popup = document.getElementById("style-scope ytd-popup-container");
            var slotRemove = getElementsCN("style-scope ytd-ad-slot-renderer");
            var companion = getElementsCN("style-scope ytd-companion-slot-renderer");
            var merch = getElementsCN("style-scope ytd-merch-shelf-renderer");
            var homeButton = document.querySelector('.title.style-scope.ytd-guide-entry-renderer');
            
            // Sets video timestamp to end of video if there is an ad playing.
            if(ad !== undefined && ad.children.length > 0){
                var adtext = getElementsCN('ytp-ad-text');
                if(adtext && Number.isFinite(video.duration)) video.currenttime = video.duration - 0.5; // set to (duration - 0.5) to bypass the yt detection system
            } 
            

            sideAds.forEach((sideAd) => {
                if (sideAd !== undefined && sideAd !== null) sideAd.remove(); // Loops through all side ads it finds and removes them from the page.
            });
            
            var closeAbleAds = document.getElementsByClassName("ytp-ad-overlay-close-button")[0];
            for(let i = 0; i < closeAbleAds.length; i++){
                closeAbleAds[i].click();
            }

            if(skipButton !== undefined) skipButton.click(); // Finds the skip button and clicks it if it exists
            if(incomingAd !== undefined) incomingAd.remove() // Removes YT Ad message Container
            if(popup !== null) popup.remove(); // stops the popup from appearing
            if(slotRemove !== undefined) slotRemove.remove(); // Removes the ad slot
            if(companion !== undefined) companion.remove(); // Removes the companion
            if(merch !== undefined) merch.remove(); // Removes the merch from videos
            if(homeButton !== null) homeButton.textContent = 'Adbliterator Online!'; // Useless imma be honest -> Ueseles but I like it. fair enough
        }
    }, 100);
});
