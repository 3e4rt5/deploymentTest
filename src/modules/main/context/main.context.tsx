import * as React from 'react';
import { Flow } from '../utils/constants';

interface SingleField {
    [key: string]: boolean;
}

export interface TenantData {
    sourceTenantName: string;
    destinationTenantName: string;
}

interface MainContext {
    settings: Set<string>;
    adPlatforms: string[];
    tenantData: TenantData;
    flow: Flow;
    setFlow(flow: Flow): void;
    setSettings(settings: Set<string>): void;
    setAdPlatforms(platforms: string[]): void;
    setTenantData(list: TenantData): void;
    toggleSelectField?(): void;
}

export const MainContext = React.createContext<MainContext | undefined>(undefined);
