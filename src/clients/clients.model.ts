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
    vehicleId: string;
    policyName: string;
    policyNumber: string;
    policyBroker: string;
    amount: number;
    validTo: Date;
    medicines?: string;
    payments?: Payment[];
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
