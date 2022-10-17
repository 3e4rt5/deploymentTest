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
                    platforms={props?.adPlatforms}
                    settings={props?.settings}
                    flow={props!.flow}
                    tenantData={props!.tenantData}
                />
            )}
        </MainContext.Consumer>
    );
};

interface WrappedExportPageProps {
    platforms?: string[];
    settings?: Set<string>;
    flow?: Flow;
    tenantData: TenantData;
}

export const WrappedExportPage: React.FC<WrappedExportPageProps> = ({
    platforms,
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
            const payloadPlatforms = platforms ?? [];
            const payloadSettings = Array.from(new Set(settings) ?? []);
            console.log("are these settings: " + payloadSettings);
            console.log("are these plats: " + payloadPlatforms);
            //const payloadColumns = JSON.stringify([...(columns ?? [])]);
            if (Flow.SETTINGS_COPIER) {
                setLoading(true);
                try {
                    setUploadedId('');
                    const uploadResp = await Api.copy({
                                  platforms: payloadPlatforms,
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
        [platforms, settings, setLoading, tenantData, flow]
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
            <Headline size="xlarge">Let's get some data!</Headline>
            {result ? (
                <React.Fragment>
                    <BodyText size="large">
                        Thank you! You will receive the list in your email when it's ready.
                    </BodyText>
                    <BodyText>{`Your request ID is: ${uploadedId}. In case of problems, please contact ssridhar@servicetitan.com with this Id.`}</BodyText>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <BodyText size="large">
                        This list will be sent to you via email once it's ready. Please enter your
                        email address.
                    </BodyText>
                        {result === false ? (
                            <Banner
                                className="w-20 m-y-2 ta-center"
                                status="critical"
                                icon
                                title="Something's gone rong! please contact ssridhar@servicetitan.com! Do not click submit again"
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
