export const fields = {
    settingsList: [
        'Businessunit',
        'Campaign',
        'Tag',
        'Pricebook',
        'Alert',
    ],
    actions: [
        { text: 'Deactivate Existing Chosen Settings', value: 'deactivate' },
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
        'https://docs.google.com/document/d/14TGrqUpLD8W0MUPYsGXxATOqT4_v1saokG2w6gwEDHs/edit',
};
