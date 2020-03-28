/**
 * Updates the icon of the given tab (only if it's the active tab)
 */
function updateIcon(tabId) {

    browser.tabs.query({currentWindow: true, active: true})
        .then(tabs => {

            // check if the given tab is active
            if (tabs[0].id == tabId) {

                // fetch data for the tab
                browser.storage.local.get(tabId.toString())
                    .then(result => {

                        if (Object.keys(result).length > 0) {

                            // set the icon based on the site data
                            let factuality = result[tabId].site.Factuality;
                            let bias = result[tabId].site.Bias;
                            if (factuality == 'Very high' || factuality == 'High') {
                                browser.browserAction.setIcon({path: 'icons/check-green-32.png'});
                            } else if (factuality == 'Mostly factual') {
                                browser.browserAction.setIcon({path: 'icons/check-yellow-32.png'});
                            } else if (factuality == 'Mixed') {
                                browser.browserAction.setIcon({path: 'icons/check-orange-32.png'});
                            } else if (factuality == 'Low' || factuality == 'Very low' || bias == 'Questionable Source') {
                                browser.browserAction.setIcon({path: 'icons/check-red-32.png'});
                            } else {
                                browser.browserAction.setIcon({path: 'icons/check-32.png'});
                            }

                        } else {

                            // site isn't recognized - set the gray icon
                            browser.browserAction.setIcon({path: 'icons/check-gray-32.png'});

                        }
                    });
            }
        });
}

/**
 * Fetches data from the repository for the given tab.
 */
function checkSite(tabUrl, tabId) {

    // fetch website data from the repo
    fetch('https://gitcdn.link/repo/fergusch/media-literacy/master/data/sites.json')

        .then((response) => {
            return response.json();
        }).then((sites) => {

            // search through the sites data and check if the current website matches any known sites
            let site_url = Object.keys(sites).find(s => 
                RegExp(`^(${s.replace('.', '\\.')}|[a-z0-9]+\\.${s.replace('.', '\\.')})`)
                .test(tabUrl.replace(/http(s|):\/\/(www\.|)/, ''))
            )

            if (site_url) {

                // if a match was found, pull the country data for that site and store it
                fetch('https://gitcdn.link/repo/fergusch/media-literacy/master/data/countries.json')

                    .then((response) => {
                        return response.json();
                    }).then((countries) => {

                        let entry = {};
                        entry[tabId] = {
                            site: sites[site_url],
                            country: countries[sites[site_url].Country]
                        }
                        browser.storage.local.set(entry);
                    });

            } else {

                // no match, remove the record for this tab (if there was one)
                browser.storage.local.remove(tabId.toString());

            }

        });

}

/**
 * Handles incoming messages from the runtime (specifically the popup)
 */
function handleMessage(message, sender, sendResponse) {

    // popup has been activated and it wants to know what we have for the tab
    if (message.command == 'get site record') {

        // query storage for the tab the popup was opened on
        browser.storage.local.get(message.tab.toString())
            .then(result => {

                if (Object.keys(result).length > 0) {

                    // if something was found, send it back to the popup
                    browser.runtime.sendMessage({
                        gotRecord: 'yes',
                        site: result[message.tab].site,
                        country: result[message.tab].country
                    });

                } else {

                    // tell the popup we don't have anything
                    browser.runtime.sendMessage({
                        gotRecord: 'no',
                    });

                }
            });
    }
}
browser.runtime.onMessage.addListener(handleMessage);

/**
 * Called when a tab is created or an existing tab navigates to a new site
 */
function handleUpdated(tabId, changeInfo, tabInfo) {

    // query the database for information about this website 
    // and update the icon if necessary
    checkSite(tabInfo.url, tabId);
    updateIcon(tabId);

}
browser.tabs.onUpdated.addListener(handleUpdated);

/**
 * Called when the user clicks on a different tab
 */
function handleActivated(activeInfo) {

    // just update the icon
    updateIcon(activeInfo.tabId);

}
browser.tabs.onActivated.addListener(handleActivated);

/**
 * Called when a tab is closed (or the entire window closes)
 */
function handleRemoved(tabId, removeInfo) {

    // delete the entry for this tab
    browser.storage.local.remove(tabId.toString());

}
browser.tabs.onRemoved.addListener(handleRemoved);

/**
 * On install, run queries for all open tabs and also open the readme on GitHub
 */
browser.runtime.onInstalled.addListener(({ reason, temporary }) => {

    if (reason == 'install' || reason == 'update') {

        // when installed or updated, run the checker on all tabs
        browser.tabs.query({}).then(tabs => {
            for (let tab of tabs) {
                checkSite(tab.url, tab.id);
            }
        });

    }

    if (reason == 'install') {

        // set the default preferred storage to local
        browser.storage.local.set({prefStorageArea: 'local'});

        // open the readme
        browser.tabs.create({ url: 'https://github.com/fergusch/media-literacy#media-literacy' });
    }
    
});