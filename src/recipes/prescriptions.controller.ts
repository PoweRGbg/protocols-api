import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Prescription } from './prescriptions.model';
import { PrescriptionsService } from './prescriptions.service';

@Controller('Prescriptions')
export class PrescriptionsController {
	constructor(private prescriptionsService: PrescriptionsService) { }

	@Post()
	createPrescription(@Body() createPrescriptionDto: { medicineName: string; validTo: Date }): Prescription {
		return this.prescriptionsService.create(createPrescriptionDto.medicineName, createPrescriptionDto.validTo);
	}

	@Get()
	getAllPrescriptions(): Prescription[] {
		return this.prescriptionsService.getAllPrescriptions();
	}

	@Get(':id')
	getPrescriptionById(@Param('id') id: number): Prescription {
		return this.prescriptionsService.getPrescriptionById(id);
	}

	@Put(':id/status')
	updatePrescriptionStatus(@Param('id') id: number, @Body('status') fulfilled: Date): Prescription {
		return this.prescriptionsService.fulfillPrescription(id, fulfilled);
	}

	@Delete(':id')
	deletePrescription(@Param('id') id: number): void {
		this.prescriptionsService.deletePrescription(id);
	}
}