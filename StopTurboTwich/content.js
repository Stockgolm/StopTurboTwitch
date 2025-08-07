function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const clickXPath = "/html/body/div[1]/div/div[1]/div/main/div[1]/div/div[2]/div/div[2]/div/div[4]/div[1]/div/div[4]/div/div[1]/button";
let removed = false;
const removeAdFreeButton = () => {
    if (removed) return;
    const buttons = document.querySelectorAll("button");
    for (const button of buttons) {
        if (button.textContent.trim().includes("Go Ad-Free for Free")) {
            button.remove();
            removed = true;
            return;
        }
    }
};
const removeInterval = setInterval(() => {
    removeAdFreeButton();
    if (removed) clearInterval(removeInterval);
}, 500);
const clickLoop = setInterval(() => {
    const button = getElementByXPath(clickXPath);
    if (button) {
        button.click();
    } else {
    }
}, 1000);
