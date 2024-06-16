import { By, until } from "selenium-webdriver";

/**
 * @summary 구매 버튼이 활성화 되어 있는지 확인
 * @param {*} driver 
 * @returns boolean
 */
async function isBuyBtnIsActive(driver) {
    try {
        const buyDiv = await driver.wait(until.elementLocated(By.css(".buy_btns.holder.pc")), 10000);
        const buyBtn = await buyDiv.findElement(By.xpath("./*"));
        const btnText = await buyBtn.getText();
        return !btnText.includes("품절");
    } catch (e) {
        throw new Error('구매 버튼을 찾을 수 없습니다.');
    }
}

/**
 * @summary 주어진 요소의 텍스트를 안전하게 가져오기
 * @param {*} element 
 * @param {*} driver 
 * @returns 텍스트
 */
async function getElementText(element, driver) {
    try {
        let text = await element.getText().catch(() => "");
        if (!text.trim()) {
            text = await driver.executeScript("return arguments[0].innerText;", element);
        }
        return text.trim();
    } catch (e) {
        throw new Error('텍스트를 가져올 수 없습니다.');
    }
}

/**
 * @summary 선택한 사이즈가 품절인지 확인
 * @param {*} driver 
 * @param {*} options 
 * @returns number
 */
async function isSelectedSize(driver, options) {
    try {
        const optionsSpan = await driver.findElements(By.className("blocked margin-bottom-lg"));
        const pricesSpan = await driver.findElements(By.className("no-margin blocked"));

        for (let i = 0; i < optionsSpan.length; i++) {
            const optionText = await getElementText(optionsSpan[i], driver);
            const priceText = await getElementText(pricesSpan[i], driver);

            if (optionText === options) {
                return priceText.includes("품절") ? 0 : 1;
            }
        }

        return -1;
    } catch (e) {
        throw e;
    }
}

export async function ironstein(driver, options) {
    try {
        if (!await isBuyBtnIsActive(driver)) {
            console.log("품절");
            return false;
        }

        const restock = await isSelectedSize(driver, options);

        if (restock === -1) throw new Error('옵션을 찾을 수 없습니다.');
        if (restock === 0) {
            console.log(`${options} 품절`);
            return false;
        }

        // 재입고 알림 구현
        return true;
    } catch (e) {
        throw e;
    }
}
