import * as React from 'react';
import {
    Headline,
    BodyText,
    Stack,
    Button,
    Card,
    ToggleSwitch,
    AnvilSelect,
} from '@servicetitan/design-system';
import { fields } from '../utils/constants';
import { MainContext } from '../context/main.context';
import { useHistory } from 'react-router-dom';

const settingsText = "Please ensure that only the settings pages you wish to copy over are toggled on (green). "
+ "If the option 'Deactivate Existing Settings' is toggled on, the tool will remove all existing records for the "
+ "selected settings pages prior to copying over the new settings."

export const SettingsPage: React.FC = () => {
    return (
        <Stack direction="column" alignItems="center">
            <Headline size="xlarge">Select Settings to Copy</Headline>
            <BodyText size="large" className='ta-center'>
                {settingsText}
            </BodyText>
            <MainContext.Consumer>
                {props => (
                    <FieldsList
                        setSelectedPlatforms={props!.setActions}
                        selectedPlatforms={props!.actions}
                        selection={props!.settings}
                        setSelection={props!.setSettings}
                    />
                )}
            </MainContext.Consumer>
        </Stack>
    );
};

interface FieldsListProps {
    selection: Set<string>;
    selectedPlatforms: any[];
    setSelectedPlatforms(platforms: string[]): void;
    setSelection(selection: Set<string>): void;
}

const FieldsList: React.FC<FieldsListProps> = ({
    selection,
    selectedPlatforms,
    setSelectedPlatforms,
    setSelection,
}) => { 
    const history = useHistory();
    const handleSwitchToggle = React.useCallback(
        (value, checked) => {
            const newSelection = new Set(selection);
            if (checked) {
                newSelection.add(value);
            } else {
                newSelection.delete(value);
            }
            setSelection(newSelection);
        },
        [setSelection, selection]
    );


    const handleActionsChange = React.useCallback(
        (platforms: any) => {
            const platformValues = platforms.value
            setSelectedPlatforms(platformValues);
        },
        [setSelectedPlatforms]
    );
        
    const handleCreateClick = React.useCallback(() => {
        history.push('/export');
    }, [history]);
    return (
        <React.Fragment>
            <Card className="w-33 m-y-4">
                <Headline className="m-y-2">Select Settings (Required)</Headline>
                <AnvilSelect
                    onChange={handleActionsChange}
                    options={fields.actions}
                    trigger={{ placeholder: 'Options' }}
                    closeOnClickOutside
                    autoFlipVertically={false}
                />
                {selectedPlatforms.includes('custom') ? (
                    <React.Fragment>
                        <Headline className="m-y-2">Deactivate Existing Settings</Headline>
                        {fields.deactivate.map(fieldName => (
                            <Card thin sharp className="m-b-2" key={fieldName}>
                                <Stack alignItems="center">
                                    <Stack.Item fill>
                                        <BodyText size="small">{fieldName}</BodyText>
                                    </Stack.Item>
                                    <ToggleSwitch
                                        checked={selection.has(fieldName)}
                                        name={fieldName}
                                        value={fieldName}
                                        onChange={handleSwitchToggle}
                                    />
                                </Stack>
                            </Card>
                        ))}
                        <Headline className="m-y-2">Settings Pages</Headline>
                        {fields.settingsList.sort().map(fieldName => (
                            <Card thin sharp className="m-b-2" key={fieldName}>
                                <Stack alignItems="center">
                                    <Stack.Item fill>
                                        <BodyText size="small">{fieldName}</BodyText>
                                    </Stack.Item>
                                    <ToggleSwitch
                                        checked={selection.has(fieldName)}
                                        name={fieldName}
                                        value={fieldName}
                                        onChange={handleSwitchToggle}
                                    />
                                </Stack>
                            </Card>
                        ))}
                    </React.Fragment>
                ) : selectedPlatforms.includes('allSettings') ?
                (
                    <React.Fragment>
                        <Headline className="m-y-2">Deactivate Existing Settings</Headline>
                        {fields.deactivate.map(fieldName => (
                            <Card thin sharp className="m-b-2" key={fieldName}>
                                <Stack alignItems="center">
                                    <Stack.Item fill>
                                        <BodyText size="small">{fieldName}</BodyText>
                                    </Stack.Item>
                                    <ToggleSwitch
                                        checked
                                        name={fieldName}
                                        value={fieldName}
                                    />
                                </Stack>
                            </Card>
                        ))}
                        <Headline className="m-y-2">Settings Pages</Headline>
                        {fields.settingsList.sort().map(fieldName => (
                            <Card thin sharp className="m-b-2" key={fieldName}>
                                <Stack alignItems="center">
                                    <Stack.Item fill>
                                        <BodyText size="small">{fieldName}</BodyText>
                                    </Stack.Item>
                                    <ToggleSwitch
                                        checked
                                        name={fieldName}
                                        value={fieldName}
                                    />
                                </Stack>
                            </Card>
                        ))}
                    </React.Fragment>
                ) : null
                }
            </Card>
            <Button
                disabled={selection.size === 0 && !selectedPlatforms.includes('allSettings')}
                className="m-t-4"
                primary
                onClick={handleCreateClick}
            >
                Next
            </Button>
        </React.Fragment>
    );
};
