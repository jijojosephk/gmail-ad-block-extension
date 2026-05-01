async function initExtension() {
    const el = (await waitForElement('#MailList div[role="listbox"]'))
    const observer = new MutationObserver(mutations => {
        hideSponsored(el);
    });

    observer.observe(el, {
        childList: false,
        subtree: false,
        attributes: true
    });
}

/**
 * 
 * @param {HTMLElement} target 
 */
function hideSponsored(target) {
    const c = target.querySelector('#OwaContainer');
    if (c) {
        c.parentElement.style.display = "none";
    }
}

/**
 * 
 * @param {*} selector 
 * @returns {Promise<HTMLElement>}
 */
function waitForElement(selector) {
    return new Promise(resolve => {
        const el = document.querySelector(selector);
        if (el) {
            resolve(el);
        }

        const observer = new MutationObserver(mutations => {
            const wait_el = document.querySelector(selector)
            if (wait_el) {
                observer.disconnect();
                resolve(wait_el);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

initExtension()