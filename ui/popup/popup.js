/**
 * Populates the popup with information sent by the background script.
 */
function populatePopup(site, country) {

    $('#outlet-name').text(site.Name);
    $('#bias-rating').text(site.Bias);

    switch (site.Bias) {

        case 'Left-Wing':
            $('#bias-arrow-top, #bias-arrow-bottom').show();
            $('.bias-arrow').animate({opacity: 1, left: '-23%'}, 1500, 'easeOutExpo');
            $('#bias-spectrum').show();
            break;

        case 'Left-Center':
            $('#bias-arrow-top, #bias-arrow-bottom').show();
            $('.bias-arrow').animate({opacity: 1, left: '-10%'}, 1500, 'easeOutExpo');
            $('#bias-spectrum').show();
            break;

        case 'Neutral':
            $('#bias-arrow-top, #bias-arrow-bottom').show();
            $('.bias-arrow').animate({opacity: 1, left: '0'}, 500, 'easeOutExpo');
            $('#bias-spectrum').show();
            break;

        case 'Right-Center':
            $('#bias-arrow-top, #bias-arrow-bottom').show();
            $('.bias-arrow').animate({opacity: 1, left: '10%'}, 1500, 'easeOutExpo');
            $('#bias-spectrum').show();
            break;

        case 'Right-Wing':
            $('#bias-arrow-top, #bias-arrow-bottom').show();
            $('.bias-arrow').animate({opacity: 1, left: '23%'}, 1500, 'easeOutExpo');
            $('#bias-spectrum').show();
            break;

        default:
            ;
    }

    if (site.Bias !== 'Questionable Source' && site.Bias !== 'Satire') {

        if (site.Factuality == 'High' || site.Factuality == 'Very high' ) {

            $('#factuality .fact-icon').attr('src', '../icons/checkmark-green-48.png');
            $('#factuality-text').addClass('high');
            $('#factuality .tooltip-body').text(
                'A high rating indicates this source usually publishes well-sourced and credible material.')

        } else if (site.Factuality == 'Mostly factual') {

            $('#factuality-text').addClass('mostly');
            $('#factuality .tooltip-body').text(
                'A "mostly factual" rating might indicate that this source sometimes publishes selective or poorly-sourced material. See the MBFC analysis for details.')
        
        } else if (site.Factuality == 'Mixed') {

            $('#factuality .fact-icon').attr('src', '../icons/warn-orange-48.png');
            $('#factuality-text').addClass('mixed');
            $('#factuality .tooltip-body').text(
                'A mixed rating might indicate that this source sometimes publishes poorly-sourced material or misinformation. See the MBFC analysis for details.')
        
        } else if (site.Factuality == 'Low' || site.Factuality == 'Very low' ) {

            $('#factuality .fact-icon').attr('src', '../icons/warn-red-48.png');
            $('#factuality-text').addClass('low');
            $('#factuality .tooltip-body').text(
                'A low rating might indicate that this source has an extreme editorial bias or publishes a lot of false information / fake news. See the MBFC analysis for details.')
        }

        $('#factuality-text').text(site.Factuality);
        $('#factuality').show();

    } else if (site.Bias == 'Questionable Source') {

        $('#citation-list').text(site.QSCitations);
        $('#citations').show();

    }

    if (country) {

        $('#country-flag').attr('src', `https://www.countryflags.io/${country.Alpha2}/flat/16.png`);
        $('#country-flag').show();

        if (country.PressRank <= 15) {

            $('#ranking').addClass('green');
            $('#rank-icon').attr('src', '../icons/checkmark-green-48.png');

        } else if (country.PressRank <= 109) {

            $('#ranking').addClass('yellow');
            $('#rank-icon').hide();

        } else if (country.PressRank <= 161) {

            $('#ranking').addClass('orange');
            $('#rank-icon').attr('src', '../icons/warn-orange-48.png');

        } else if (country.PressRank > 161) {

            $('#ranking').addClass('red');
            $('#rank-icon').attr('src', '../icons/warn-red-48.png');

        }

        $('#rank-num').text(country.PressRank);
        $('#press-rank').show();
    }

    if (country && country.hasOwnProperty('Profile')) {

        $('#country-name').html(`
            <a href="${country.Profile}">${site.Country}</a>
        `);

    } else {

        $('#country-name').text(site.Country);

    }

    $('#mbfc-link').attr('href', site.MBFCLink);

    $('#loading').hide();
    $('#analysis').show();
}

/**
 * Handles messages sent by the background script
 */
function handleMessage(message) {

    if (message.gotRecord == 'yes') {

        // data found, display it in the popup
        populatePopup(message.site, message.country);

    } else if (message.gotRecord == 'no') {

        // no data - show default screen
        $('#loading').hide();
        $('#default').show();

    }
}
browser.runtime.onMessage.addListener(handleMessage);

/**
 * Called when the popup has finished loading
 * This is necessary for jQuery to edit the popup
 */
$(document).ready(function() {

    /**
     * Fired when the user clicks on the preferences icon.
     * Hides the main content and shows the preferences menu.
     */
    $('.pref-icon').click(function() {

        $('#popup').animate({
            height: $('#preferences-content').height() + 60
        }, 1000, 'easeOutExpo');
        $('#popup-content').animate({left: '-50%'}, 1000, 'easeOutExpo');
        $('#preferences').animate({left: '-50%'}, 1000, 'easeOutExpo');

    });

    /**
     * Fired when the user clicks the "back" button on the preferences menu.
     * Hides the menu and returns to the main content.
     */
    $('#pref-back').click(function() {
        $('#popup').animate({
            height: $('#popup-content').height() + 60
        }, 1000, 'easeOutExpo');
        $('#popup-content').animate({left: '0'}, 1000, 'easeOutExpo');
        $('#preferences').animate({left: '0'}, 1000, 'easeOutExpo');
    });

    /**
     * Fired when the user clicks the 'enable dark mode' option.
     * Automatically changes the theme and saves to preferences.
     */
    $('#enable-dark').click(function(e) {

        e.preventDefault();

        if ($(this).find('input[type="checkbox"]').prop('checked')) {

            // set switch to unchecked
            $(this).find('input[type="checkbox"]').prop('checked', false);
            $('body').removeClass('dark');

            usePreferredStorageArea(function(storage) {
                storage.set({prefDark: false});
            });

        } else {

            // set switch to checked
            $(this).find('input[type="checkbox"]').prop('checked', true);
            $('body').addClass('dark');

            usePreferredStorageArea(function(storage) {
                storage.set({prefDark: true});
            });

        }

    });

    /**
     * Fired when the user clicks the 'use firefox sync' button.
     * Automatically saves to preferences.
     */
    $('#enable-sync').click(function(e) {

        e.preventDefault();

        if ($(this).find('input[type="checkbox"]').prop('checked')) {

            // set switch to unchecked
            $(this).find('input[type="checkbox"]').prop('checked', false);

            // get prefs from sync
            browser.storage.sync.get(['prefDark'])
                .then(result => {

                    let prefs = {
                        prefStorageArea: 'local'
                    };

                    if (result.hasOwnProperty('prefDark')) {
                        prefs.prefDark = result.prefDark;
                    }

                    browser.storage.local.set(prefs);

                    browser.storage.sync.remove(['prefStorageArea', 'prefDark']);

                });

        } else {

            // set switch to checked
            $(this).find('input[type="checkbox"]').prop('checked', true);

            // import preferences into sync
            browser.storage.local.get(['prefStorageArea', 'prefDark'])
                .then(result => {

                    if (result.prefStorageArea == 'local') {

                        let prefs = {
                            prefStorageArea: 'sync'
                        };

                        if (result.hasOwnProperty('prefDark')) {
                            prefs.prefDark = result.prefDark;
                        }

                        browser.storage.sync.set(prefs);
                        browser.storage.local.set({
                            prefStorageArea: 'sync'
                        });

                        browser.storage.local.remove(['prefDark']);

                    }

                });

        }

    });

    // set theme and auto-populate preferences when popup launched
    browser.storage.local.get('prefStorageArea')
        .then(result => {

            if (result.prefStorageArea == 'sync') {
                $('#enable-sync input[type="checkbox"]').prop('checked', true);
            }

            usePreferredStorageArea(function(storage) {

                storage.get(['prefDark']).then(result => {

                    if (result.hasOwnProperty('prefDark') && result.prefDark) {
                        $('#enable-dark input[type="checkbox"]').prop('checked', true);
                        $('body').addClass('dark');
                    }

                    // let the background script know we're ready for data
                    browser.tabs.query({currentWindow: true, active: true})
                    .then(tabs => {
                        browser.runtime.sendMessage({
                            command: 'get site record',
                            tab: tabs[0].id
                        });
                    });

                });
            });

        });

    // set the version number from manifest.json at the bottom of the popup
    $('.version').html(browser.runtime.getManifest().version);

});