import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    SeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    CollectionModule,
    CategoryModule,
    DiscountModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
