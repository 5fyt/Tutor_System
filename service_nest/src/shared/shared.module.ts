import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { RedisService } from './services/redis.service';
import { UtilService } from './services/util.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
// import { ConfigurationKeyPaths } from '@/config/configuration';

// common provider list
const providers = [UtilService, RedisService];

/**
 * 全局共享模块
 */
@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // redis cache
    // CacheModule.register(),
    // jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('authSecret.secret'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
        // password: configService.get<string>('redis.password'),
        db: configService.get<number>('redis.db'),
      }),
      inject: [ConfigService],
    }),

    //upload
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: join(__dirname, '../images'),
          filename: (_, file, callback) => {
            const fileName = `${Date.now()}-${extname(file.originalname)}`;
            return callback(null, fileName);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...providers],
  exports: [HttpModule, JwtModule, MulterModule, ...providers],
})
export class SharedModule {}
