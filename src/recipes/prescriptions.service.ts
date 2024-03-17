import { Injectable } from '@nestjs/common';
import { Prescription } from './prescriptions.model';

@Injectable()
export class PrescriptionsService {
    private prescriptions: Prescription[] = [];

    create(medicineName: string, validTo: Date, issued?: Date): Prescription {
        const id = this.prescriptions.length + 1;
        const prescription: Prescription = {
            id,
            medicineName,
            validTo,
            issued
        };
        this.prescriptions.push(prescription);
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
        
    }
}