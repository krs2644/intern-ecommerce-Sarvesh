import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getProfile(userId: number) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (updateProfileDto.email && updateProfileDto.email !== user.email) {
            const existing = await this.prisma.user.findUnique({
                where: { email: updateProfileDto.email },
            });
            if (existing) {
                throw new ConflictException('Email already in use');
            }
        }

        const data: any = { ...updateProfileDto };

        if (updateProfileDto.password) {
            data.password = await bcrypt.hash(updateProfileDto.password, 10);
        } else {
            delete data.password;
        }

        const updated = await this.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updated;
    }

    async deleteProfile(userId: number) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() },
        });

        return { message: 'Account deleted successfully' };
    }
}
