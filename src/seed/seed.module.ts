import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { UserModule } from 'src/user/user.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CommandModule, UserModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
