import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeedService {
  constructor(private userService: UserService) {}

  @Command({
    command: 'seed:super-admin',
    describe: 'seed super admin',
  })
  async seedSuperAdmin() {
    await this.userService.seedSuperAdmin();
  }

  @Command({
    command: 'seed:roles',
    describe: 'seed roles',
  })
  async seedRoles() {
    await this.userService.seedRoles();
  }
}
