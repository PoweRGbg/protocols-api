export interface Client {
    id: number;
    user: string;
    clientName: string;
    identifier: string;
    contact?: string;
    comment?: string;
    vehicles?: string[];
    policiess?: Policy[];
}

export interface Policy {
    id: number;
    type?: string;
    vehicleId: string;
    policyName: string;
    policyNumber: string;
    broker: string;
    company: string;
    amount: number;
    validTo: Date;
    payments?: Payment[];
    created?: Date;
    updated?: Date;
}

export interface Payment {
    id: number;
    date: string;
    amount: number;
    issued: boolean;
    sent: boolean;
    paid: boolean;
    clientInformed: boolean;
    policyId: number;
}
