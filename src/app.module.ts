import { Module } from '@nestjs/common';
import { PrescriptionsController } from './recipes/prescriptions.controller';
import { PrescriptionsService } from './recipes/prescriptions.service';

@Module({
  imports: [],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class AppModule {}
