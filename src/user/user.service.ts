import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Role, RoleDocument } from './schemas/Role.schema';
import { User, UserDocument } from './schemas/User.schema';
import { BCRYPT_HASH_ROUND, roles } from 'src/utils/constants';

@Injectable()
export class UserService {
  private readonly superAdminDetails: {
    name: string;
    email: string;
    password: string;
  } = {
    name: 'Super Admin',
    email: 'super-admin@bnel.com',
    password: 'admin',
  };
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}
  async createAdmin(adminDetails: {
    name: string;
    email: string;
    password: string;
  }) {
    const role = await this.roleModel.findOne({
      name: 'Admin',
    });
    const newAdmin = new this.userModel({
      ...adminDetails,
      role: role.id,
    });
    return newAdmin;
  }

  async getAllUsers() {
    const users = await this.userModel.find({});
    return users;
  }

  async findUser(userId: string) {
    const user = await this.userModel.findOne({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserRole(user: UserDocument) {
    const role = await this.roleModel.findById(user.role);
    return role.name;
  }
  async seedSuperAdmin() {
    await this.userModel.findOneAndDelete({
      email: this.superAdminDetails.email,
    });
    const hashedPass = await bcrypt.hash(
      this.superAdminDetails.password,
      BCRYPT_HASH_ROUND,
    );
    const role = await this.roleModel.findOne({
      name: 'SuperAdmin',
    });
    const superAdmin = await this.userModel.create({
      ...this.superAdminDetails,
      password: hashedPass,
      role: role,
    });
    console.log(superAdmin);
  }

  async seedRoles() {
    await this.roleModel.deleteMany({});

    for (const role of roles) {
      const newRole = await this.roleModel.create(role);
      console.log(newRole);
    }
    return true;
  }
}
