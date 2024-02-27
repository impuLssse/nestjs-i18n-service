import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TranslateRepository } from './translation.repository';
import { TranslateEntity } from './entities';
import { CreateTranslateDto, UpdateTranslateDto } from './dto';

@Injectable()
export class TranslationService {
  constructor(private translateRepository: TranslateRepository) {}

  async createTranslation(
    translation: CreateTranslateDto,
  ): Promise<TranslateEntity> {
    const translationIsExists = await this.getTranslation(translation);
    if (translationIsExists) {
      throw new ConflictException();
    }

    return this.translateRepository.save(translation);
  }

  async updateTranslation(
    key: string,
    language_code: string,
    translation: UpdateTranslateDto,
  ): Promise<TranslateEntity> {
    const translationIsExists = await this.getTranslation({
      key,
      language_code,
    });
    if (!translationIsExists) {
      throw new NotFoundException();
    }

    return this.translateRepository.save(translation);
  }

  async getTranslations(
    translation?: Partial<TranslateEntity>,
  ): Promise<TranslateEntity[]> {
    return this.translateRepository.find({
      where: translation,
    });
  }

  async getTranslation(
    translation: Partial<TranslateEntity>,
  ): Promise<TranslateEntity> {
    const translationIsExists = await this.translateRepository.findOne({
      where: translation,
    });
    if (!translationIsExists) {
      throw new NotFoundException();
    }

    return translationIsExists;
  }

  async getTranslationsByKey(key: string): Promise<TranslateEntity[]> {
    return this.getTranslations({ key });
  }

  async getTranslationsByLanguageCode(
    language_code: string,
  ): Promise<TranslateEntity[]> {
    return this.getTranslations({ language_code });
  }

  async deleteTranslation(key: string, language_code: string): Promise<{}> {
    const translationIsExists = await this.getTranslation({
      key,
      language_code,
    });
    if (!translationIsExists) {
      throw new NotFoundException();
    }

    await this.translateRepository.delete({ key, language_code });
    return {};
  }

  async deleteTranslationsByKey(key: string): Promise<{}> {
    await this.translateRepository.delete({
      key,
    });
    return {};
  }

  async deleteTranslationsByLanguageCode(language_code: string): Promise<{}> {
    await this.translateRepository.delete({
      language_code,
    });
    return {};
  }
}
