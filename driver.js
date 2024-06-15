import { Browser, Builder } from 'selenium-webdriver';

export async function connDriver(url) {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(url);
    return driver;
}