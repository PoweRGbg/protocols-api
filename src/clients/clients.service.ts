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
        this.resolveDuplicateIds();
    }

    private resolveDuplicateIds(): void {
        const idMap = new Map<number, Client>();
        let maxId = 0;

        this.clients.forEach((client) => {
            maxId = Math.max(maxId, client.id);
            if (idMap.has(client.id)) {
                // Duplicate ID found, assign a new ID
                client.id = ++maxId;
            }
            idMap.set(client.id, client);
        });

        // Update the clients array with the de-duplicated clients
        this.clients = Array.from(idMap.values());

        // Write the updated clients to file
        this.writeToFile();
    }

    create(client: Client, user: string): Client {
        const maxId = this.clients.reduce(
            (max, client) => Math.max(max, client.id),
            0,
        );
        const id = maxId + 1;
        const newClient = { id, ...client, user, created: new Date() };
        this.clients.push(newClient);
        this.writeToFile();
        return newClient;
    }

    updateClient(client: Client, user: string): Client {
        const clientExists = this.clients.find(
            (clientInDb) => clientInDb.id === client.id,
        );
        if (!clientExists) {
            throw new Error('Client not found - update failed');
        }
        const updatedClient = { ...client, user, updated: new Date() };
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
            this.resolveDuplicateIds(); // Add this line
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
