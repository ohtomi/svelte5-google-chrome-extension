<script lang="ts">
    import {createExtensionSettings} from '@/entrypoints/popup/state';
    import Formatter from '@/entrypoints/popup/Formatter.svelte';
    import NewFormatter from '@/entrypoints/popup/NewFormatter.svelte';

    let settings = createExtensionSettings();
</script>

<main>
    <div class="header">
        <span>ウェブページの情報を読み取る</span>
    </div>
    <div class="formatters">
        {#each settings.formatters as formatter (formatter.name)}
            <Formatter name={formatter.name} format={formatter.format} {settings}/>
        {/each}
    </div>
    <hr/>
    <div class="footer">
        <NewFormatter {settings}/>
    </div>
</main>

<style>
    :global(:root) {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    :global(body) {
        position: relative;
        width: 100%;
        height: 100%;

        margin: 0;
        padding: 8px;
        box-sizing: border-box;
    }

    main {
        min-width: 360px;
        max-width: 360px;
        min-height: 150px;
        max-height: 400px;
        overflow-y: scroll;
    }

    .header {
        padding-bottom: 4px;
    }

    .formatters {
        padding: 0 10px;
    }

    .footer {
        padding: 0 10px;
    }
</style>
