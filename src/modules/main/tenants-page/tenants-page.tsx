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
        <div className="ta-center">
            <Headline size="xlarge">Let's enrich some data!</Headline>
            <BodyText size="large">
                Would you like to generate a new list or enrich an existing list?
            </BodyText>
            <FlowCard.Step
                title="Please enter a name for this list"
                className="m-t-4"
                content={
                    <React.Fragment>
                        <BodyText className={`${Styles.requiredTitle} fs-italic`}>
                            Required
                        </BodyText>
                        <Input
                            value={sourceTenantName}
                            onChange={handleSourceNameChange}
                            placeholder="Test-list-010221"
                        />
                    </React.Fragment>
                }
                saved={sourceTenantName.length > 0}
            />
            <FlowCard.Step
                title="Please enter a name for this list"
                className="m-t-4"
                content={
                    <React.Fragment>
                        <BodyText className={`${Styles.requiredTitle} fs-italic`}>
                            Required
                        </BodyText>
                        <Input
                            value={destinationTenantName}
                            onChange={handleDestinationNameChange}
                            placeholder="Test-list-010221"
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
