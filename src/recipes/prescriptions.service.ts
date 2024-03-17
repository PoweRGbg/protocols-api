import { Injectable } from '@nestjs/common';
import { Prescription } from './prescriptions.model';
import * as fs from 'fs';

@Injectable()
export class PrescriptionsService {
    private prescriptions: Prescription[] = [];
    private readonly filePath = 'prescriptions.json';

    constructor() {}

    onModuleInit() {
        this.readFromFile();
    }

    create(medicineName: string, validTo: Date, issued?: Date): Prescription {
        const id = this.prescriptions.length + 1;
        const prescription: Prescription = {
            id,
            medicineName,
            validTo,
            issued
        };
        this.prescriptions.push(prescription);
        this.writeToFile();
        return prescription;
    }

    getAllPrescriptions(): Prescription[] {
        return this.prescriptions;
    }

    getPrescriptionById(id: number): Prescription | undefined {
        return this.prescriptions.find((Prescription) => Prescription.id === id);
    }

    fulfillPrescription(id: number, fulfilledDate: Date): Prescription | undefined {
        const Prescription = this.getPrescriptionById(id);
        if (Prescription) {
            Prescription.fulfilledDate = fulfilledDate;
            return Prescription;
        }
    }

    deletePrescription(id: number): void {
        this.prescriptions = this.prescriptions.filter((prescription) => prescription.id !== Number(id));
        this.writeToFile();
    }

    private readFromFile(): void {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.prescriptions = JSON.parse(data);
        } catch (error) {
            console.error('Error reading from file :', error);
        }
    }

    private writeToFile(): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.prescriptions), 'utf8');
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }
}