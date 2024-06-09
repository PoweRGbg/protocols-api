import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { Client, Policy } from './clients.model';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService) {}

    @Post()
    createClient(
        @Body()
        createClientDto: {
            id: number;
            clientName: string;
            identifier: string;
            contact: string;
            comment: string;
            user: string;
        },
    ): Client {
        console.log('createClientDto', createClientDto);
        return this.clientService.create(
            {
                id: createClientDto.id,
                user: createClientDto.user,
                clientName: createClientDto.clientName,
                identifier: createClientDto.identifier,
                contact: createClientDto.contact,
                comment: createClientDto.comment,
                policiess: [],
            },
            createClientDto.user,
        );
    }

    @Get()
    getAllClients(): Client[] {
        return this.clientService.getAllClients();
    }

    @Get(':id')
    getClientById(@Param('id') id: number): Client {
        return this.clientService.getClientById(id);
    }

    @Put()
    updateClientStatus(
        @Param('id') id: number,
        @Body()
        createClientDto: {
            id: number;
            clientName: string;
            identifier: string;
            contact: string;
            comment: string;
            policies?: Policy[];
            user: string;
        },
    ): Client {
        return this.clientService.updateClient(
            createClientDto,
            createClientDto.user,
        );
    }

    @Delete(':id')
    deleteClient(@Param('id') id: number): void {
        this.clientService.deleteClient(id);
    }
}
