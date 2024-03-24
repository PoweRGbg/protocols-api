export class Prescription {
    id: number;
    medicineName: string;
    user: string;
    issued?: Date;
    validTo: Date;
    fulfilledDate?: Date;
}