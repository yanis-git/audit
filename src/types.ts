export interface Metadata {
    packageJson?: any;
}

export type AuditFunction = (page: any, metadata: Metadata) => Promise<AuditResult | false>;

export interface AuditResult {
    name: string;
    message: string;
    payload?: any;
}

export interface Result {
    ecoIndex: {
        pages: {
            ecoIndex: number;
            grade: string;
            greenhouseGasesEmission: number;
            waterConsumption: number;
        }[];
        ecoIndex: number;
        grade: string;
        greenhouseGasesEmission: number;
        waterConsumption: number;
    };
    audits: { [key: string]: { [key: string]: AuditResult } };
    biggestRequest: { url: string; size: number }[];
}