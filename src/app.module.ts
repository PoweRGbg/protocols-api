import { Module } from '@nestjs/common';
import { PrescriptionsController } from './recipes/prescriptions.controller';
import { PrescriptionsService } from './recipes/prescriptions.service';
import { ProtocolsController } from './protocols/protocols.controller';
import { ProtocolsService } from './protocols/protocols.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import jwtConfig from './common/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/validation/env.validation';
import { BcryptService } from './auth/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import redisConfig from './common/config/redis.config';
import { UsersService } from './auth/users.service';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [jwtConfig, redisConfig],
            validate,
        }),
    ],
    controllers: [
        PrescriptionsController,
        ProtocolsController,
        AuthController,
        ClientsController,
    ],
    providers: [
        PrescriptionsService,
        ProtocolsService,
        ClientsService,
        AuthService,
        BcryptService,
        JwtService,
        Repository,
        UsersService,
    ],
})
export class AppModule {}
