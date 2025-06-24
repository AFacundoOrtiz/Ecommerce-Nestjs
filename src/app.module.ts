import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm.config';
import { CategoryModule } from './modules/Category/category.module';
import { DataSourceOptions } from 'typeorm';
import { CloudinaryModule } from './modules/Cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { RoleModule } from './modules/Role/role.module';
import { SeederModule } from './seeders/seeder.module';
import { OrdersModule } from './modules/Order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DataSourceOptions>(`typeorm`);
        return {
          ...config,
          autoLoadEntities: true,
        };
      },
    }),
    RoleModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    CategoryModule,
    CloudinaryModule,
    JwtModule.register(jwtConfig),
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
