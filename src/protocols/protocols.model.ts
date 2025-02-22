export class Protocol {
    id: number;
    user: string;
    medicines: string[];
    issued?: Date;
    fulfilledDate?: Date;
    validTo: Date;
}
