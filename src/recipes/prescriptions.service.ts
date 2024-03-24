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

    create(medicineName: string, validTo: Date, user: string, issued?: Date): Prescription {
        const id = this.prescriptions.length + 1;
        const prescription: Prescription = {
            id,
            user,
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
        const prescription = this.prescriptions.find((prescription) => prescription.id === id);
        
        if (prescription) {
            const index = this.prescriptions.indexOf(prescription);
            prescription.fulfilledDate = fulfilledDate;
            this.prescriptions[index] = {...prescription};
            this.writeToFile();
            console.log('Prescription fulfilled:', prescription);
            return prescription;
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
            if (error.code === 'ENOENT') {
                this.writeToFile();
            } else {
                console.error('Error reading from file :', error);
            }
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