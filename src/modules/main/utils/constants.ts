export const fields = {
    settingsList: [
        'Alert',
        'Job Type',
        'Campaign',
        'Campaign Category',
        'Business Unit',
        'Business Unit Group',
        'Division',
        'Trade',
        'Arrival Window',
        'Zone',
        'Business Hours',
        'Cancel Job Reason',
        'Call Reason',
        'Hold Job Reason',
        'Tag Type',
        'Custom Field Type',
        'Permission',
        'Task Management',
        'Form',
        'Skill',
        'Purchase Order Type',
        'Transfer Type',
        'Truck',
        'Warehouse',
        'Vendor',
        'Membership Type',
        'Recurring Service Type',
        'Tax Zone',
        'Payment Term',
        'Payment Collections',
        'Payment Type',
        'General Ledger Account',
        'Timesheet Code',
        'Email',
        'Email Template',
        'Mobile Settings',
        'Customer Notifications',
        'Custom Follow up',
        'Pricebook',
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
