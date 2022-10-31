import React, { ChangeEvent, useCallback } from 'react';
import {
    Banner,
    BodyText,
    Button,
    Card,
    Headline,
    Input,
    Stack,
} from '@servicetitan/design-system';
import { Api } from '../api/main.api';
import { TenantData, MainContext } from '../context/main.context';
import { Flow } from '../utils/constants';

export const ExportPage: React.FC = () => {
    return (
        <MainContext.Consumer>
            {props => (
                <WrappedExportPage
                    actions={props?.actions}
                    settings={props?.settings}
                    flow={props!.flow}
                    tenantData={props!.tenantData}
                />
            )}
        </MainContext.Consumer>
    );
};

interface WrappedExportPageProps {
    actions?: string[];
    settings?: Set<string>;
    flow?: Flow;
    tenantData: TenantData;
}

export const WrappedExportPage: React.FC<WrappedExportPageProps> = ({
    actions,
    settings,
    flow,
    tenantData,
}) => {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<boolean | undefined>();
    const [uploadedId, setUploadedId] = React.useState('');
    const handleUploadClick = React.useCallback(
        (email: string) => async () => {
            const payloadActions = actions ?? [];
            const payloadSettings = Array.from(new Set(settings) ?? []);
            console.log("are these settings: " + payloadSettings);
            console.log("are these actions: " + payloadActions);
            //const payloadColumns = JSON.stringify([...(columns ?? [])]);
            if (Flow.SETTINGS_COPIER) {
                setLoading(true);
                try {
                    setUploadedId('');
                    const uploadResp = await Api.copy({
                                  actions: payloadActions,
                                  settings: payloadSettings,
                                  sourceTenantName: tenantData.sourceTenantName,
                                  destinationTenantName: tenantData.destinationTenantName,
                              })
                    setResult(true);
                    setUploadedId(uploadResp.data);
                } catch (e) {
                    setResult(false);
                } finally {
                    setEmail('');
                    setLoading(false);
                }
            } else {
                setResult(false);
            }
        },
        [actions, settings, setLoading, tenantData, flow]
    );

    /*const handleEmailChange = useCallback(
        (email: ChangeEvent<HTMLInputElement>) => {
            console.log('when is this line being executed 1?')
            if (result === false) {
                setResult(undefined);
            }
            console.log('when is this line being executed?')
            setEmail(email.currentTarget.value);
        },
        [result]
    );*/

    return (
        <Stack direction="column" alignItems="center">
            <Headline size="xlarge">Let's copy some settings!</Headline>
            {result ? (
                <React.Fragment>
                    <BodyText size="large" className="ta-center">
                        {`You're all set! If you encounter any issues with the data import
                        , please do not attempt to run the tool again. Instead, please contact ssridhar@servicetitan.com regarding request id: ${uploadedId}`}
                    </BodyText>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <BodyText size="large" className='ta-center'>
                        Once your settings copy request is submitted, you should receive an email with results within 5-10 minutes. 
                        If you have any issues, please use the support button at the bottom right hand corner of the page to submit feedback.
                    </BodyText>
                        {result === false ? (
                            <Banner
                                className="w-20 m-y-2 ta-center"
                                status="critical"
                                icon
                                title="Something went wrong! Please do not attempt to run the tool again. Instead, please contact ssridhar@servicetitan.com"
                            />
                        ) : null}
                        <Button
                            className="w-20 m-y-2 ta-center"
                            loading={loading}
                            //disabled={!email}
                            primary
                            onClick={handleUploadClick(email)}
                        >
                            Submit
                        </Button>
                </React.Fragment>
            )}
        </Stack>
    );
};
