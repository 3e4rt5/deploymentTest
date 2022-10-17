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

export const SettingsPage: React.FC = () => {
    return (
        <Stack direction="column" alignItems="center">
            <Headline size="xlarge">Let's enrich some data!</Headline>
            <BodyText size="large">
                Please select ad platform(s) and/or custom fields to include in your list.
            </BodyText>
            <MainContext.Consumer>
                {props => (
                    <FieldsList
                        setSelectedPlatforms={props!.setAdPlatforms}
                        selectedPlatforms={props!.adPlatforms}
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
            const platformValues = platforms.map((platform: any) => platform.value);
            setSelectedPlatforms(platformValues);
            console.log(platforms)
        },
        [setSelectedPlatforms]
    );
        
    const handleCreateClick = React.useCallback(() => {
        history.push('/export');
    }, [history]);

    return (
        <React.Fragment>
            <Card className="w-33 m-y-4">
                <Headline className="m-y-2">Formatting Options</Headline>
                <AnvilSelect
                    multiple
                    onChange={handleActionsChange}
                    options={fields.actions}
                    trigger={{ placeholder: 'Options' }}
                    closeOnClickOutside
                    autoFlipVertically={false}
                />
                {selectedPlatforms.includes('custom') ? (
                    <React.Fragment>
                        <Headline className="m-y-2">Company Attributes</Headline>
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
                ) : null}
            </Card>
            <Button
                disabled={(selection.size === 0 || selectedPlatforms.length === 0) && selectedPlatforms.indexOf('allSettings') === -1}
                className="m-t-4"
                primary
                onClick={handleCreateClick}
            >
                Next
            </Button>
        </React.Fragment>
    );
};
