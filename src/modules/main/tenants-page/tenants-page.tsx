import { useHistory } from 'react-router-dom';
import React, { SyntheticEvent, useState } from 'react';
import {
    Headline,
    BodyText,
    FlowCard,
    Button,
    Input,
} from '@servicetitan/design-system';
import { Flow } from '../utils/constants';
import Styles from './tenants-page.module.scss';
import { TenantData, MainContext } from '../context/main.context';

export const TenantsPage: React.FC = () => {
    return (
        <MainContext.Consumer>
            {props => (
                <TenantsPageConsumer
                    setFlow={props!.setFlow}
                    setTenantData={props!.setTenantData}
                    setSettings={props!.setSettings}
                    setActions={props!.setActions}
                    
                />
            )}
        </MainContext.Consumer>
    );
};

export const TenantsPageConsumer: React.FC<{
    setFlow(flow: Flow): void;
    setTenantData(list: TenantData): void;
    setSettings(settings: Set<string>): void;
    setActions(actions: string[]): void;
}> = ({ setFlow, setTenantData, setSettings, setActions }) => {
    const [sourceTenantName, setSourceName] = useState('');
    const [destinationTenantName, setDestinationName] = useState('');
    const [readyForSave, setReadyForSave] = useState(false);

    const history = useHistory();

    const handleSave = React.useCallback(() => {
        setTenantData({
            sourceTenantName,
            destinationTenantName
        });
        history.push('/settings');
    }, [
        sourceTenantName,
        destinationTenantName,
        setTenantData
    ]);

    React.useEffect(() => {
        if (readyForSave) {
            handleSave();
            setSettings(new Set());
            setActions([]);
        }
    }, [readyForSave, handleSave]);

    const isDisabledSaveButton =
        !destinationTenantName.trim().length || !sourceTenantName.trim().length;

    const prepareToSave = React.useCallback(() => {
        setFlow(Flow.SETTINGS_COPIER);
        setReadyForSave(true);
    }, [sourceTenantName, destinationTenantName, setFlow]);

    const handleSourceNameChange = (_: SyntheticEvent, data: any) => {
        setSourceName(data.value.trim());
    };

    const handleDestinationNameChange = (_: SyntheticEvent, data: any) => {
        setDestinationName(data.value.trim());
    };

    return (
        <div className="ta-center d-f flex-column align-items-center">
            <Headline size="xlarge">Enter Source & Destination Tenants</Headline>
            <BodyText size="large">
                <p>
                    Please enter the source and destination tenants below. The tool will copy the settings from the source tenant and 
                    import them to the destination tenant.

                    <br /> <br />Please make sure that the destination tenant meets the following conditions:
                    <br />- Is not in a live state
                    <br />- Has the SettingsMigrationTool tag applied
                </p>
            </BodyText>
            <FlowCard.Step
                title="Please enter the source tenant name (where to pull from)"
                className="m-t-2 w-66"
                content={
                    <React.Fragment>
                        <Input
                            value={sourceTenantName}
                            onChange={handleSourceNameChange}
                            placeholder="tenant1"
                        />
                    </React.Fragment>
                }
                saved={sourceTenantName.length > 0}
            />
            <FlowCard.Step
                title="Please enter the destination tenant name (where to import the new settings)"
                className="m-t-4 w-66"
                content={
                    <React.Fragment>
                        <Input
                            value={destinationTenantName}
                            onChange={handleDestinationNameChange}
                            placeholder="tenant2"
                        />
                    </React.Fragment>
                }
                saved={destinationTenantName.length > 0}
            />
            <Button
                disabled={isDisabledSaveButton}
                onClick={prepareToSave}
                className="m-t-4"
                primary
            >
                Next
            </Button>
        </div>
    );
};
