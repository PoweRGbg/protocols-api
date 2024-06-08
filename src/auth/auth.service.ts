import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

import jwtConfig from '../common/config/jwt.config';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';

export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        // @InjectRepository(User)
        private readonly userService: UsersService,
        // private readonly redisService: RedisService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, name, password } = signUpDto;

        try {
            const user: User = {
                id: randomUUID(),
                email,
                name,
                password: await this.bcryptService.hash(password),
            };
            this.userService.create(user);
            return;
        } catch (error) {
            // Check if the error is a duplicate entry error
            throw error;
        }
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const { email, password } = signInDto;

        const user = await this.userService.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            console.log('Invalid email', email);
            throw new BadRequestException('Invalid email');
        }

        const isPasswordMatch = await this.bcryptService.compare(
            password,
            user.password,
        );
        if (!isPasswordMatch) {
            console.log('Invalid password', password);
            throw new BadRequestException('Invalid password');
        }
        console.log('generating token', user.id);
        return await this.generateAccessToken(user);
    }

    async signOut(userId: string): Promise<void> {
        console.log('signOut', userId);
        // this.redisService.delete(`user-${userId}`);
    }

    async generateAccessToken(
        user: Partial<User>,
    ): Promise<{ accessToken: string }> {
        const tokenId = randomUUID();
        // await this.redisService.insert(`user-${user.id}`, tokenId);
        console.log('generateAccessToken for user', user.id);
        const accessToken = await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                tokenId,
            } as ActiveUserData,
            {
                secret: 'somethingSecret',
                expiresIn: 1800,
            },
        );

        return { accessToken };
    }
}
