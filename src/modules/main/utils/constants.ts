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
};

export enum Flow {
    SETTINGS_COPIER = 1,
    ENRICH_EXISTING_LIST = 2,
}

export const redirectTo = {
    helpAndTrainings:
        'https://servicetitan.atlassian.net/wiki/spaces/GE/pages/2433941857/Settings+Copy+Tool+User+Guide',
};
