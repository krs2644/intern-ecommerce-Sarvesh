import { Controller, Get, Patch, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('profile')
    getProfile(@Request() req: any) {
        return this.usersService.getProfile(req.user.id);
    }

    @Patch('profile')
    updateProfile(
        @Request() req: any,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.usersService.updateProfile(req.user.id, updateProfileDto);
    }

    @Delete('profile')
    deleteProfile(@Request() req: any) {
        return this.usersService.deleteProfile(req.user.id);
    }
}
