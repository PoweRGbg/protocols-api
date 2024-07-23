import { Injectable } from '@nestjs/common';
import { User } from './auth.service';
import * as fs from 'fs';

@Injectable()
export class UsersService {
    private users: User[] = [];
    private readonly filePath = 'users.json';

    constructor() { }

    onModuleInit() {
        this.readFromFile();
    }

    create(user: User): User {
        // this.readFromFile();
        this.users.push(user);
        this.writeToFile();
        return user;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    deleteUser(userId: string): void {
        this.users = this.users.filter((user) => user.id !== userId);
        this.writeToFile();
    }

    findOne(options: { where: { email: string } }): User | undefined {
        return this.users.find((user) => user.email === options.where.email);
    }

    private readFromFile(): void {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.writeToFile();
            } else {
                console.error('Error reading USERS from file :', error);
            }
        }
    }

    private writeToFile(): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users), 'utf8');
        } catch (error) {
            console.error('Error writing USERS to file:', error);
        }
    }
}
