import { Injectable } from '@nestjs/common';
import { Client } from './clients.model';
import * as fs from 'fs';

@Injectable()
export class ClientsService {
    private clients: Client[] = [];
    private readonly filePath = 'clients.json';

    constructor() {}

    onModuleInit() {
        this.readFromFile();
    }

    create(client: Client, user: string): Client {
        const id = this.clients.length + 1;
        const newClient = { id, ...client, user };
        console.log('client', client);
        console.log('newClient', newClient);
        this.clients.push(newClient);
        this.writeToFile();
        return client;
    }

    updateClient(client: Client, user: string): Client {
        console.log('client to update', client);
        const clientExists = this.clients.find(
            (clientInDb) => clientInDb.id === client.id,
        );
        if (!clientExists) {
            throw new Error('Client not found - update failed');
        }
        const updatedClient = { ...client, user };
        this.clients = this.clients.map((clientInDb) =>
            clientInDb.id === client.id ? updatedClient : clientInDb,
        );
        this.writeToFile();
        return client;
    }

    getAllClients(): Client[] {
        return this.clients;
    }

    getClientById(id: number): Client | undefined {
        const result = this.clients.find((client) => client.id === id);
        console.log('client', result);
        return result;
    }

    fulfillClient(id: number): Client | undefined {
        const Client = this.getClientById(id);
        if (Client) {
            return Client;
        }
    }

    deleteClient(id: number): void {
        this.clients = this.clients.filter(
            (client) => client.id !== Number(id),
        );
        this.writeToFile();
    }

    private readFromFile(): void {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.clients = JSON.parse(data);
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
            fs.writeFileSync(
                this.filePath,
                JSON.stringify(this.clients),
                'utf8',
            );
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }
}
