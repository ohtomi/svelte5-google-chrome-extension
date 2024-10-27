export default defineUnlistedScript({
    main() {
        // nothing to do
    },
});

export const formatText = (format: string): string => {
    return format
        .replace('$title', document.title)
        .replace('$url', document.location.href)
        .replace('$selection', window.getSelection()?.toString() ?? '')
        .replace('$lf', '\n');
};

export const tryWriteTextUntilSuccessfully =
    (timeoutMs: number) =>
        (delayMs: number) =>
            (text: string) =>
                (done: (result?: unknown) => void) =>
                    (nth: number) => {

                        const maxRetry = timeoutMs / delayMs;
                        if (nth > maxRetry) {
                            done(false);
                            return;
                        }

                        window.focus();
                        setTimeout(async () => {
                            try {
                                await navigator.clipboard.writeText(text);
                                done(true);
                            } catch (err) {
                                console.error(err);
                                tryWriteTextUntilSuccessfully(timeoutMs)(delayMs)(text)(done)(nth + 1);
                            }
                        }, delayMs);
                    };
