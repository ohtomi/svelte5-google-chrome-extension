import {formatText, tryWriteTextUntilSuccessfully} from '@/entrypoints/content-helper';

export default defineContentScript({
    matches: ['*://*/*'],
    main() {
        browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
            if (typeof request !== 'string') {
                return;
            }

            const text = formatText(request);
            const tryingWriteText = tryWriteTextUntilSuccessfully(1000)(10)(text)(sendResponse);
            tryingWriteText(0);
        });
    },
});
