import { Controller, Get, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiAuth, CurrentUser } from '../decorators';

@Controller('users')
@ApiAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('profile')
    getProfile(@CurrentUser() user: any) {
        return this.usersService.getProfile(user.id);
    }

    @Patch('profile')
    updateProfile(
        @CurrentUser() user: any,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.usersService.updateProfile(user.id, updateProfileDto);
    }

    @Delete('profile')
    deleteProfile(@CurrentUser() user: any) {
        return this.usersService.deleteProfile(user.id);
    }
}
