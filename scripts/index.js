async function initExtension() {
    /**
     * @type {HTMLElement}
     */
    const tabElement = await waitForElement('div.UI div');
    const observer = new MutationObserver(mutations => {
        hideSponsored(tabElement);
    });

    tabElement.childNodes.forEach(panel => {
        observer.observe(panel, {
            childList: true,
            subtree: true
        });
    })
}

/**
 * 
 * @param {HTMLElement} target 
 */
function hideSponsored(target) {
    target.querySelectorAll('table tbody tr td span span span span').forEach((i) => {
        if (i.textContent === "Sponsored·")
            i.closest('tr').style.display = "none";
    });
}

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