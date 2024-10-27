<script lang="ts">
    import {createExtensionSettings, removeFormatter, updateFormatter} from '@/entrypoints/popup/state/';

    type Props = {
        name: string;
        format: string;
        settings: Awaited<ReturnType<typeof createExtensionSettings>>;
    };

    let {
        name,
        format = $bindable(),
        settings,
    }: Props = $props();

    const handleCopy = () => {
        browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs.length === 0) {
                return;
            }

            const activeTab = tabs[0];
            browser.tabs.sendMessage(activeTab.id!, format);
        });
    };

    const handleUpdateFormatter = async () => {
        await updateFormatter(settings, name, format);
    };

    const handleRemoveFormatter = async () => {
        await removeFormatter(settings, name);
    };
</script>

<div class="formatter">
    <button onclick={handleCopy}>{name}でコピー</button>
    <button onclick={handleUpdateFormatter}>更新</button>
    <button onclick={handleRemoveFormatter}>削除</button>
    <input type="text" class="format" bind:value={format}/>
</div>

<style>
    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
    }

    button:hover {
        border-color: #646cff;
    }

    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
        button {
            background-color: #f9f9f9;
        }
    }

    .formatter {
        width: 100%;
        padding: 4px 0;
    }

    input.format {
        width: 100%;
    }
</style>
