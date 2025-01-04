import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkClientProvider } from '../providers/clerk-client.provider';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
