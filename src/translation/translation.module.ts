import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { TranslateRepository } from './translation.repository';

@Module({
  controllers: [TranslationController],
  providers: [TranslationService, TranslateRepository],
})
export class TranslationModule {}
