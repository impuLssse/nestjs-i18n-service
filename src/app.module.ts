import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { TranslationModule } from './translation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateEntity } from '@translation/entities';

@Module({
  imports: [
    TranslationModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: process.env.PG_HOST,
          port: Number(process.env.PG_PORT),
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE,
          entities: [TranslateEntity],
          poolSize: 1,
          logging: true,
          uuidExtension: 'uuid-ossp',
        };
      },
    }),
  ],
})
export class AppModule {}
