import { connDriver } from "./driver.js";
import { ironstein } from "./ironstein.js";
import { sendDiscordNotification } from "./notification.js";

const urls = [
    "https://www.ironstein.co.kr/31/?idx=24"
];
const optionsList = [
    "XXL"
];

const indicesToDelete = [];

async function main(url, option, index) {
    let driver;
    try {
        driver = await connDriver(url);

        if (url.includes("ironstein")) {
            const isRestore = await ironstein(driver, option);

            if (isRestore) {
                // indicesToDelete.push(index);
                await sendDiscordNotification(url, option);
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    finally {
        if (driver) {
            await driver.quit();
        }
    }
}

(async function () {
    const promises = urls.map((url, index) => main(url, optionsList[index], index));
    await Promise.all(promises);

    indicesToDelete.sort((a, b) => b - a);
    for (const index of indicesToDelete) {
        urls.splice(index, 1);
        optionsList.splice(index, 1);
    }

    console.log("Updated URLs:", urls);
    console.log("Updated Options:", optionsList);
})();
