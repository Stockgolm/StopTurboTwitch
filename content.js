function getElementByXPath(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const clickXPaths = [
    "//*[@id='root']/div/div[1]/div/main/div[1]/div/div[2]/div/div[2]/div/div[4]/div[1]/div/div[5]/div/div[1]/button",
    "//*[@id='root']/div/div[1]/div/main/div[1]/div/div[2]/div/div[2]/div/div[4]/div[1]/div/div[6]/div/div[1]/button",
    "//*[@id='root']/div/div[1]/div/main/div[1]/div/div[2]/div/div[2]/div/div[4]/div[1]/div/div[4]/div/div[1]/button"
];
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
    for (const path of clickXPaths) {
        const button = getElementByXPath(path);
        if (button) {
            button.click();
            return;
        }
    }
}, 1000);
const volumeSlider = document.querySelector('[data-a-target*="player-volume-slider"]');
if (volumeSlider) {
    volumeSlider.addEventListener('wheel', (event) => {
        event.preventDefault();
        let volume = parseFloat(volumeSlider.value);
        if (event.deltaY < 0) {
            volume += 0.01;
        } else {
            volume -= 0.01;
        }
        volume = Math.min(1, Math.max(0, volume));
        volumeSlider.value = volume;
        const fill = volumeSlider.parentElement.querySelector('[data-test-selector="tw-range__fill-value-selector"]');
        if (fill) fill.style.width = `${volume * 100}%`;
        volumeSlider.dispatchEvent(new Event('input', { bubbles: true }));
        volumeSlider.dispatchEvent(new Event('change', { bubbles: true }));
        if (window.Twitch?.Player) {
            const player = window.Twitch.Player ? window.Twitch.Player : null;
        }
    });
}
