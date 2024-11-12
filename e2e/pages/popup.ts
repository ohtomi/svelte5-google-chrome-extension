import {Page} from '@playwright/test';

export async function openPopup(page: Page, extensionId: string) {
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    await page.waitForSelector('button');

    const popup = {
        getCopyButton: (label: string) => page.getByText(label),
        clickCopyButton: async (label: string) => {
            const button = popup.getCopyButton(label);
            await button.click();
        },
        getAddInput: (placeholder: string) => page.getByPlaceholder(placeholder),
        fillAddInput: async (placeholder: string, data: string) => {
            const input = popup.getAddInput(placeholder);
            await input.fill(data);
        },
        getAddButton: (label: string) => page.getByText(label),
        clickAddButton: async (label: string) => {
            const button = popup.getAddButton(label);
            await button.click();
        },
        getUpdateInput: (label: string) => page.locator(`xpath=//button[text()="${label}"]/following-sibling::button[text()="更新"]/following-sibling::button[text()="削除"]/following-sibling::input`),
        fillUpdateInput: async (label: string, data: string) => {
            const input = popup.getUpdateInput(label);
            await input.fill(data);
        },
        getUpdateButton: (label: string) => page.locator(`xpath=//button[text()="${label}"]/following-sibling::button[text()="更新"]`),
        clickUpdateButton: async (label: string) => {
            const button = popup.getUpdateButton(label);
            await button.click();
        },
        getRemoveButton: (label: string) => page.locator(`xpath=//button[text()="${label}"]/following-sibling::button[text()="更新"]/following-sibling::button[text()="削除"]`),
        clickRemoveButton: async (label: string) => {
            const button = popup.getRemoveButton(label);
            await button.click();
        },
    };

    return popup;
}
