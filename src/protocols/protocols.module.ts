import { Module } from '@nestjs/common';
import { ProtocolsService } from './protocols.service';
import { ProtocolsController } from './protocols.controller';

@Module({
  providers: [ProtocolsService],
  controllers: [ProtocolsController]
})
export class RecipesModule {}
