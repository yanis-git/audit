import {RemoteWithRefs} from "simple-git";
import {Inquirer} from "inquirer";

export interface Metadata {
    packageJson?: any;
    git?: GitMetadata;
    readme?: boolean,
    urls?: string[]
}

export interface GitMetadata {
    remotes?: RemoteWithRefs[]
}

export type AsyncAuditFunction = (inquirer: Inquirer) => Promise<AuditResult | boolean>
export type AuditFunction = (page: any, metadata: Metadata) => Promise<AuditResult | boolean>;

export interface AuditResult {
    name?: string;
    message?: string;
    payload?: any;
    links?: string[]
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
