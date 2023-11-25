import { Module } from '@nestjs/common';
import { validationSchema } from './config/validationSchema';
import { ConfigModule } from '@nestjs/config';
import { generateTypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationentitiesModule } from './relationentities/relationentities.module';
import { TeamsModule } from './teams/teams.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './common/throttler-behind-proxy.guard';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : process.env.NODE_ENV === 'prod'
            ? '.env.prod'
            : '.env.test',
      validationSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 10,
    }),
    TypeOrmModule.forRoot(generateTypeOrmConfig(process.env)),
    TeamsModule,
    RelationentitiesModule,
    MeetingsModule,
    AnnouncementsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
