import { Module } from '@nestjs/common';
import { PrescriptionsController } from './recipes/prescriptions.controller';
import { PrescriptionsService } from './recipes/prescriptions.service';
import { ProtocolsController } from './protocols/protocols.controller';
import { ProtocolsService } from './protocols/protocols.service';

@Module({
  imports: [],
  controllers: [PrescriptionsController, ProtocolsController],
  providers: [PrescriptionsService, ProtocolsService],
})
export class AppModule {}
