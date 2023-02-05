import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from 'src/guards/roleGuards.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard(['Admin', 'SuperAdmin']))
  async getAllUsers() {
    const data = await this.userService.getAllUsers();
    return {
      success: true,
      message: 'Users fetched successfully',
      data,
    };
  }
}
