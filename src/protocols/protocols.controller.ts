import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { Protocol } from './protocols.model';
import { ProtocolsService } from './protocols.service';

@Controller('Protocols')
export class ProtocolsController {
    constructor(private protocolsService: ProtocolsService) {}

    @Post()
    createProtocol(
        @Body()
        createProtocolDto: {
            medicines: string[];
            validTo: Date;
            user: string;
        },
    ): Protocol {
        return this.protocolsService.create(
            createProtocolDto.medicines,
            createProtocolDto.validTo,
            createProtocolDto.user,
        );
    }

    @Get()
    getAllProtocols(): Protocol[] {
        return this.protocolsService.getAllProtocols();
    }

    @Get(':id')
    getProtocolById(@Param('id') id: number): Protocol {
        return this.protocolsService.getProtocolById(id);
    }

    @Put(':id/status')
    updateProtocolStatus(
        @Param('id') id: number,
        @Body('status') fulfilled: Date,
    ): Protocol {
        return this.protocolsService.fulfillProtocol(id, fulfilled);
    }

    @Delete(':id')
    deleteProtocol(@Param('id') id: number): void {
        this.protocolsService.deleteProtocol(id);
    }
}
