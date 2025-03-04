import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from './bcrypt.service';
import jwtConfig from '../common/config/jwt.config';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig.asProvider()),
        JwtService,
        Repository,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        BcryptService,
        JwtService,
        Repository,
        UsersService,
    ],
    exports: [JwtModule],
})
export class AuthModule {}
