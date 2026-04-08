async function initExtension() {
    const el = await waitForElement('div.UI');
    const observer = new MutationObserver(mutations => {
        document.querySelectorAll('div.UI table tbody tr td span span span span').forEach((i) => {
            if (i.textContent === "Sponsored·")
                i.closest('tr').style.display = "none";
        })
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(el.firstChild, {
        childList: true,
        subtree: true,
        attributeFilter: ['style'],
        attributes: true
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

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

initExtension()