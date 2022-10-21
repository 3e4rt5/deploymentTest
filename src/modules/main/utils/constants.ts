export const fields = {
    settingsList: [
        'Businessunit',
        'Campaign',
        'Tag',
        'Pricebook',
        'Alert',
    ],
    actions: [
        { text: 'All Settings', value: 'allSettings' },
        { text: 'Custom Settings', value: 'custom' },
    ],
    deactivate: [
        'Deactivate Existing Settings'
    ]
};

export enum Flow {
    SETTINGS_COPIER = 1,
    ENRICH_EXISTING_LIST = 2,
}

export const redirectTo = {
    helpAndTrainings:
        'https://servicetitan.com',
};
