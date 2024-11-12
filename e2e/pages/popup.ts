import {Page} from '@playwright/test';

export async function openPopup(page: Page, extensionId: string) {
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    await page.waitForSelector('button');

    const popup = {
        getButton: (label: string) => page.getByText(label),
        clickButton: async (label: string) => {
            const button = popup.getButton(label);
            await button.click();
        },
    };

    return popup;
}
