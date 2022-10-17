import React, { useCallback, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Frame, Page } from '@servicetitan/design-system';

import './App.css';
import { Header } from './modules/main/components/header/header';
import { IntroPage } from './modules/main/intro-page/intro-page';
//import { TenantsPage } from './modules/main/tenants-page/tenants-page';
import { SettingsPage } from './modules/main/settings-page/settings-page';
import { ExportPage } from './modules/main/export-page/export-page';
//import { ImportPage } from './modules/main/upload-page/import-page';
//
import { TenantData, MainContext } from './modules/main/context/main.context';
import { Flow } from './modules/main/utils/constants';
import { Feedback } from './modules/main/components/feedback/feedback';
import { TenantsPage } from './modules/main/tenants-page/tenants-page';

export const App: React.FC = () => {
    const [adPlatforms, setAdPlatforms] = useState<string[]>([]);
    const [settings, setSettings] = useState<Set<string>>(new Set());
    const [flow, setFlow] = useState(Flow.SETTINGS_COPIER);
    const [tenantData, setTenantData] = useState<TenantData>({
        sourceTenantName: '',
        destinationTenantName: ''
    });
    return (
        <React.StrictMode>
            <BrowserRouter>
                <MainContext.Provider
                    value={{
                        adPlatforms,
                        tenantData,
                        settings,
                        flow,
                        setFlow,
                        setTenantData,
                        setSettings,
                        setAdPlatforms,
                    }}
                >
                    <Frame header={<Header />}>
                        <Page align="center" maxWidth="default">
                            <Switch>
                                <Route path="/" exact component={IntroPage} />
                                <Route path="/import" exact component={IntroPage} />
                                <Route path="/tenants" exact component={TenantsPage} />
                                <Route path="/settings" exact component={SettingsPage} />
                                <Route path="/export" exact component={ExportPage} />
                                <Route component={IntroPage} />
                            </Switch>
                        </Page>
                        <Feedback />
                    </Frame>
                </MainContext.Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
};
