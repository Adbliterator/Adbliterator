// Readability is important so I hope you don't mind the changes.
// Change whatever you don't like.

chrome.storage.local.get(null, (config) => {
    let playbackRate = 1;

    // Cleaning up the code a little with this funciton.
    function getSideAds() {
        var sideAd1 = document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0];
        var sideAd2 = document.getElementsByClassName("style-scope ytd-item-section-renderer sparkles-light-cta")[0];
        var newSideAd1 = document.getElementsByClassName("style-scope ytd-ad-slot-renderer")[0];

        // New Ad System
        var newSideAd2 = document.evaluate(
            '//*[@id="panels"]',
            document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null,
            
        ).singleNodeValue;
        
        return [sideAd1, sideAd2, newSideAd1, newSideAd2]
    }

    // Adblocker Loop.
    setInterval(() => {
        if(config['uselessytfeatures-enabled'] === true) {
            var voiceSearch = document.getElementById("voice-search-button");
            var fuckPremium = document.querySelector('a[href="/paid_memberships?ybp=mAEK"]');
            var banner = document.getElementById("big-yoodle");
    
            if (voiceSearch !== null) voiceSearch.remove();
            if (fuckPremium !== null) fuckPremium.remove();
            if (banner !== null) banner.remove();
        }

        var inputElement = document.querySelector('#search-input input');
        if(inputElement !== null){
            inputElement.setAttribute('placeholder', 'Search (Adbliterator V1.0.3 by Segation)');
        } 
        

        var video = document.getElementsByClassName("video-stream html5-main-video")[0]

        if(video !== undefined && config['allowytads-enabled'] === false) {
            var ad = document.getElementsByClassName("video-ads ytp-ad-module")[0];
            var sideAds = getSideAds();
            var closeAbleAds = document.getElementsByClassName("ytp-ad-overlay-close-button");
            var skipButton = document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0];
            var incomingAd = document.getElementsByClassName("ytp-ad-message-container")[0];

            var popup = document.getElementById("style-scope ytd-popup-container");
            var slotRemove = document.getElementsByClassName("style-scope ytd-ad-slot-renderer")[0];
            
            var companion = document.getElementsByClassName("style-scope ytd-companion-slot-renderer")[0];
            var merch = document.getElementsByClassName("style-scope ytd-merch-shelf-renderer")[0];
            var homeButton = document.querySelector('.title.style-scope.ytd-guide-entry-renderer');
            

            if(ad == undefined) {
                playbackRate = video.playbackRate;
            } else {
                if (ad.children.length > 0) {
                    var adtext = document.getElementsByClassName('ytp-ad-text')[0];

                    if(adtext) {
                        video.playbackRate = 16;
                        video.volume = 0;
                    }
                }
            }

            sideAds.forEach((sideAd) => {
                if (sideAd !== undefined && sideAd !== null) {
                    sideAd.remove(); // sidead.style.display="none"; // Idk if you need to do this.
                }
            });

            for(let i = 0; i < closeAbleAds.length; i++) {
                closeAbleAds[i].click();
            }

            if(skipButton !== undefined) {
                skipButton.click();
            }

            if(incomingAd !== undefined){
                incomingAd.style.display = "none";
            }

            if(popup !== null){
                popup.remove();
            }

            if(slotRemove !== undefined){
                slotRemove.remove();
            } 

            

            if(companion !== undefined){
                companion.remove();
            }

            
            if(merch !== undefined){
                merch.remove();
            }

            if(homeButton !== null){
                homeButton.textContent = 'Adbliterator Online!';
            } 
        }

        // Should be the last thing it does as it is not as important to the functionality of the adblock.
        if(window.location.href.includes("https://www.youtube.com/premium")) {
            var Price = document.getElementsByClassName("yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap")[0];
            if(Price !== undefined){
                Price.textContent = "You are using Adbliterator premium is useless\nYou get most these features free basically";
            }

            var ButtonTrial = document.getElementsByClassName("lp-header-section-view-model__lp-header-button-section")[0];
            if(ButtonTrial !== undefined){
                ButtonTrial.remove();
            }

            var Smth = document.evaluate(
                '//*[@id="contents"]/yt-section-group-view-model/yt-lp-section-group-view-model/div/div[2]/undefined/div/div[3]', 
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null,
              ).singleNodeValue;
            
            if(Smth !== null){
                Smth.remove();
            }

            var Smths = document.evaluate(
                '//*[@id="contents"]/yt-section-group-view-model/yt-lp-section-group-view-model/div/div/ytm-lp-offer-card-section-view-model/div/div/div/span/span',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null,
              ).singleNodeValue;
            
            if(Smths !== null){
                Smths.remove();
            }

            var membership = document.getElementsByClassName("ytm-lp-offer-card-section-view-model__offer-cards-container")[0];
            if(membership !== undefined){
                membership.remove();
            }   
        } else if(window.location.href.includes("https://music.youtube.com/music_premium")){
            window.location.href = "https://www.youtube.com/premium";
        }
    }, 100);
});