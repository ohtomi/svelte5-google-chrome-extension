import {expect, test} from './fixtures';
import {openPopup} from './pages/popup';
import {openTarget} from './pages/target';

test('ボタンをクリックしたとき、クリップボードへ書き込まれること', async ({page, context, extensionId}) => {
    const popup = await openPopup(page, extensionId);
    const target = await openTarget(context);

    await target.goto(
        'this is title',
        'https://github.com',
        'this is selection.',
    );

    await popup.clickButton('マークダウン記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('[this is title](https://github.com/)\nthis is selection.');

    await target.goto(
        'title for cosense',
        'https://github.com',
        'selection for cosense.',
    );

    await popup.clickButton('Cosense記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('[title for cosense https://github.com/]\nselection for cosense.');
});
