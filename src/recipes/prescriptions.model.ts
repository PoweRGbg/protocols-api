export class Prescription {
    id: number;
    medicineName: string;
    issued?: Date;
    validTo: Date;
    fulfilledDate?: Date;
}