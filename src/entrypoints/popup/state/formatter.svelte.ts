type ExtensionSettings = {
    formatters: Formatter[];
}

type Formatter = {
    name: string;
    format: string;
};

const initialFormatters = [
    {
        name: 'マークダウン記法',
        format: '[$title]($url)$lf$selection',
    },
    {
        name: 'Cosense記法',
        format: '[$title $url]$lf$selection',
    },
];

export const createExtensionSettings = (): ExtensionSettings => {
    const settings: ExtensionSettings = $state({formatters: []});
    loadExtensionSettings()
        .then((loaded: ExtensionSettings) => {
            settings.formatters = loaded.formatters;
        });
    return settings;
};

const extensionSettingsStorage = storage.defineItem<unknown>('local:ExtensionSettings', {
    init: () => ({
        formatters: initialFormatters,
    }),
});

const loadExtensionSettings = async (): Promise<ExtensionSettings> => {
    const loaded = await extensionSettingsStorage.getValue();
    if (!isExtensionSettings(loaded)) {
        return {
            formatters: initialFormatters,
        };
    }
    return loaded;
};

const saveExtensionSettings = async (settings: ExtensionSettings): Promise<void> => {
    await extensionSettingsStorage.setValue(settings);
};

const isExtensionSettings = (value: unknown): value is ExtensionSettings => {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value !== 'object') {
        return false;
    }
    if (!('formatters' in value)) {
        return false;
    }
    if (!Array.isArray(value.formatters)) {
        return false;
    }
    return value.formatters.every(isFormatter);
};

const isFormatter = (value: unknown): value is Formatter => {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value !== 'object') {
        return false;
    }
    if (!('name' in value)) {
        return false;
    }
    if (typeof value.name !== 'string') {
        return false;
    }
    if (!('format' in value)) {
        return false;
    }
    if (typeof value.format !== 'string') {
        return false;
    }
    return true;
};

export const addFormatter = async (settings: ExtensionSettings, name: string, format: string): Promise<void> => {
    settings.formatters = [...settings.formatters, {name, format}];
    await saveExtensionSettings(settings);
};

export const updateFormatter = async (settings: ExtensionSettings, name: string, format: string): Promise<void> => {
    settings.formatters = [...settings.formatters, {name, format}];
    await saveExtensionSettings(settings);
};

export const removeFormatter = async (settings: ExtensionSettings, name: string): Promise<void> => {
    settings.formatters = settings.formatters.filter((formatter) => formatter.name !== name);
    await saveExtensionSettings(settings);
};
