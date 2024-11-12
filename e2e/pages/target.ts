import {BrowserContext} from '@playwright/test';

export async function openTarget(context: BrowserContext) {
    const newPage = await context.newPage();

    const target = {
        goto: async (title: string, url: string, selection: string) => {
            await newPage.goto(url);
            await newPage.evaluate(({title, selection}) => {
                document.title = title;

                const input = document.createElement('input');
                input.type = 'text';
                input.value = selection;
                document.body.appendChild(input);
                input.select();
            }, {title, selection});
        },
        readClipboardText: async () => {
            return newPage.evaluate(() => navigator.clipboard.readText());
        },
    };

    return target;
}
