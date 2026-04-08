async function initExtension() {
    const el = await waitForElement('div.UI');
    const observer = new MutationObserver(mutations => {
        document.querySelectorAll('div.UI table tbody tr td span span span span').forEach((i) => {
            if (i.textContent === "Sponsored·")
                i.closest('tr').style.display = "none";
        })
    });

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

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

initExtension()