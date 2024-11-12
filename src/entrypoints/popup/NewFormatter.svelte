<script lang="ts">
    import {addFormatter, createExtensionSettings} from '@/entrypoints/popup/state/';

    type Props = {
        settings: Awaited<ReturnType<typeof createExtensionSettings>>;
    };

    let {settings}: Props = $props();

    let name = $state('');
    let format = $state('');

    const handleAddFormatter = async () => {
        if (!name || !format) {
            return;
        }

        await addFormatter(settings, name, format);

        name = '';
        format = '';
    };
</script>

<div class="formatter">
    <input type="text" class="name" placeholder="新規フォーマット名" bind:value={name}/>
    <button onclick={handleAddFormatter}>登録</button>
    <input type="text" class="format" placeholder="新規フォーマット文字列" bind:value={format}/>
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

    input.name {
        width: 70%;
    }

    input.format {
        width: 100%;
    }
</style>
