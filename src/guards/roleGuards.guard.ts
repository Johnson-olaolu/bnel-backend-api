import {
  CanActivate,
  ExecutionContext,
  Inject,
  mixin,
  Type,
} from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/User.schema';
import { UserService } from 'src/user/user.service';

const RoleGuard = (roles: string[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(
      @Inject(UserService) private readonly userService: UserService,
    ) {}
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user as UserDocument;
      const roleName = await this.userService.getUserRole(user);
      return roles.includes(roleName);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
