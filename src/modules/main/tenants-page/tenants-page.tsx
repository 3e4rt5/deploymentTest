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
                />
            )}
        </MainContext.Consumer>
    );
};

export const TenantsPageConsumer: React.FC<{
    setFlow(flow: Flow): void;
    setTenantData(list: TenantData): void;
}> = ({ setFlow, setTenantData }) => {
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
            <Headline size="xlarge">Please enter your Source and Destination tenants below</Headline>
            <BodyText size="large">
                <p>
                    Please ensure that your destination tenant meets the following conditions:
                    <br />Is not in a Live State
                    <br />Has the SettingsMigrationTool Tag applied
                </p>
            </BodyText>
            <FlowCard.Step
                title="Please enter your Source Tenant name (This is where we will pull from)"
                className="m-t-4 w-75"
                content={
                    <React.Fragment>
                        <Input
                            value={sourceTenantName}
                            onChange={handleSourceNameChange}
                            placeholder="demotenant1"
                        />
                    </React.Fragment>
                }
                saved={sourceTenantName.length > 0}
            />
            <FlowCard.Step
                title="Please enter your Destination Tenant name (This is where we will import to)"
                className="m-t-4 w-75"
                content={
                    <React.Fragment>
                        <Input
                            value={destinationTenantName}
                            onChange={handleDestinationNameChange}
                            placeholder="demotenant2"
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
