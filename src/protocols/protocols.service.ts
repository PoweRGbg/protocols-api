import { Injectable } from '@nestjs/common';
import { Protocol } from './protocols.model';
import * as fs from 'fs';

@Injectable()
export class ProtocolsService {
    private protocols: Protocol[] = [];
    private readonly filePath = 'protocols.json';

    constructor() {}

    onModuleInit() {
        this.readFromFile();
    }

    create(medicines: string[], validTo: Date, issued?: Date): Protocol {
        const id = this.protocols.length + 1;
        const prescription: Protocol = {
            id,
            medicines,
            validTo,
            issued
        };
        this.protocols.push(prescription);
        this.writeToFile();
        return prescription;
    }

    getAllProtocols(): Protocol[] {
        return this.protocols;
    }

    getProtocolById(id: number): Protocol | undefined {
        return this.protocols.find((Protocol) => Protocol.id === id);
    }

    fulfillProtocol(id: number, fulfilledDate: Date): Protocol | undefined {
        const Protocol = this.getProtocolById(id);
        if (Protocol) {
            // Protocol.fulfilledDate = fulfilledDate;
            return Protocol;
        }
    }

    deleteProtocol(id: number): void {
        this.protocols = this.protocols.filter((prescription) => prescription.id !== Number(id));
        this.writeToFile();
    }

    private readFromFile(): void {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.protocols = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.writeToFile();
            } else {
                console.error('Error reading from file :', error);
            }
        }
    }

    private writeToFile(): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.protocols), 'utf8');
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }
}