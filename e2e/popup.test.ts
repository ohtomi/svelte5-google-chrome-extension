import {expect, test} from './fixtures';
import {openPopup} from './pages/popup';
import {openTarget} from './pages/target';

test('ボタンをクリックしたとき、クリップボードへ書き込まれること', async ({page, context, extensionId}) => {
    const popup = await openPopup(page, extensionId);
    const target = await openTarget(context);

    await target.goto(
        'title for markdown',
        'https://github.com',
        'selection for markdown.',
    );

    await popup.clickCopyButton('マークダウン記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('[title for markdown](https://github.com/)\nselection for markdown.');

    await target.goto(
        'title for cosense',
        'https://github.com',
        'selection for cosense.',
    );

    await popup.clickCopyButton('Cosense記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('[title for cosense https://github.com/]\nselection for cosense.');
});

test('新しいフォーマット文字列を登録して、コピーできること', async ({page, context, extensionId}) => {
    const popup = await openPopup(page, extensionId);
    const target = await openTarget(context);

    await target.goto(
        'title for new format',
        'https://github.com',
        'selection for new format.',
    );

    await popup.fillAddInput('新規フォーマット名', 'HTML Aタグ記法');
    await popup.fillAddInput('新規フォーマット文字列', '<a href="$url">$title</a><br/><span>$selection</span>');
    await popup.clickAddButton('登録');

    await expect(page.getByText('HTML Aタグ記法でコピー')).toBeVisible();
    await expect(page.getByPlaceholder('新規フォーマット名')).toHaveValue('');
    await expect(page.getByPlaceholder('新規フォーマット文字列')).toHaveValue('');

    await popup.clickCopyButton('HTML Aタグ記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('<a href="https://github.com/">title for new format</a><br/><span>selection for new format.</span>');

    await popup.fillUpdateInput('HTML Aタグ記法でコピー', '<span>$selection</span><br/><a href="$url">$title</a>');
    await popup.clickUpdateButton('HTML Aタグ記法でコピー');

    await popup.clickCopyButton('HTML Aタグ記法でコピー');
    await expect.poll(() => target.readClipboardText()).toBe('<span>selection for new format.</span><br/><a href="https://github.com/">title for new format</a>');

    await popup.clickRemoveButton('HTML Aタグ記法でコピー');
    await expect(page.getByText('HTML Aタグ記法でコピー')).not.toBeVisible();
});
