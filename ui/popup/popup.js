/**
 * Populates the popup with information sent by the background script.
 */
function populatePopup(site, country) {

    $('#outlet-name').text(site.Name);
    $('#bias-rating').text(site.Bias);

    switch (site.Bias) {

        case 'Left-Wing':
            $('#bias-spectrum').attr('src', '../bias-spectrums/left.png');
            $('#bias-spectrum').show();
            break;

        case 'Left-Center':
            $('#bias-spectrum').attr('src', '../bias-spectrums/left-center.png');
            $('#bias-spectrum').show();
            break;

        case 'Neutral':
            $('#bias-spectrum').attr('src', '../bias-spectrums/neutral.png');
            $('#bias-spectrum').show();
            break;

        case 'Right-Center':
            $('#bias-spectrum').attr('src', '../bias-spectrums/right-center.png');
            $('#bias-spectrum').show();
            break;

        case 'Right-Wing':
            $('#bias-spectrum').attr('src', '../bias-spectrums/right.png');
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

    // let the background script know we want some data for the active tab
    browser.tabs.query({currentWindow: true, active: true})
        .then(tabs => {
            browser.runtime.sendMessage({
                command: 'get site record',
                tab: tabs[0].id
            });
        });

    // set the version number from manifest.json at the bottom of the popup
    $('.version').html(browser.runtime.getManifest().version);

});