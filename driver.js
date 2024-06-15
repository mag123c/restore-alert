import { Browser, Builder, Capabilities } from "selenium-webdriver";

export async function connDriver(url) {
    try {
        const chromeCapabilities = Capabilities.chrome();
        chromeCapabilities.set('goog:chromeOptions', {
            args: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        });

        let driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .withCapabilities(chromeCapabilities)
            .build();
        await driver.get(url);
        return driver;
    }
    catch (e) {
        throw e;
    }

}
