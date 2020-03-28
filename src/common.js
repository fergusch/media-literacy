/**
 * Determines the user's preferred storage area (sync or local)
 * and passes it to the given function for access.
 * 
 * Enables the user to disable syncing data even if Firefox Sync is turned on.
 */

function usePreferredStorageArea(fn) {

    browser.storage.local.get('prefStorageArea')
        .then(result => {
            if (result.hasOwnProperty('prefStorageArea') && result.prefStorageArea == 'sync') {
                fn(browser.storage.sync);
            } else {
                fn(browser.storage.local);
            }
        });

}