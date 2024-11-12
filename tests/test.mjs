import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log("Navigating to dashboard...");
        await driver.get('http://localhost:3000/dash');
        await driver.sleep(5000); // Increased wait time

        console.log("Attempting to locate the Users link...");
        const usersLink = await driver.wait(
            until.elementLocated(By.xpath("//li[contains(@class, 'nav-item')]//span[text()='Users']")),
            20000 // Adjust wait time
        );

        await driver.wait(until.elementIsVisible(usersLink), 20000); // Wait until it's visible

        console.log("Users link located, attempting to click...");
        await usersLink.click();

        // Check if the URL is as expected after clicking
        await driver.wait(until.urlIs('http://localhost:3000/listusers'), 10000); // Adjust URL as necessary
        console.log("Navigated to Users page");

        // Example assertion using Chai
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:3000/listusers'); // Adjust expected URL

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

runTest().catch(console.error);
