import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) { }
    async signup(signupDto: SignupDto) {
        const SALT_ROUNDS = 10;
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: signupDto.email,
            }
        });
        if (existingUser && !existingUser.deletedAt) {
            throw new BadRequestException('This email already exists');
        }

        const hashedPassword = await bcrypt.hash(signupDto.password, SALT_ROUNDS);
        const user = await this.prisma.user.create({
            data: {
                name: signupDto.name,
                email: signupDto.email,
                password: hashedPassword,
            }
        });

        return {
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: loginDto.email,
                deletedAt: null,
            }
        })

        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid email or password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        }

        const token = await this.jwtService.signAsync(payload);

        return {
            message: 'Login Successful',
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
}