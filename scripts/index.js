async function initExtension() {
    /**
     * @type {HTMLElement}
     */
    const el = await waitForElement('div.UI');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            if (!(m.target.style.display == 'none')) {
                hideSponsored(m.target)
            }
        })
    });

    el.firstChild.childNodes.forEach(child => {
        observer.observe(child, {
            childList: false,
            subtree: false,
            attributeFilter: ['style'],
            attributes: true
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