import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TranslationDoc } from '@shared/docs';
import { TranslateResponse } from './responses';
import { CreateTranslateDto, UpdateTranslateDto } from './dto';

@ApiTags('Translations')
@Controller('translations/v2')
export class TranslationController {
  constructor(private translationService: TranslationService) {}

  @ApiBody({
    type: UpdateTranslateDto,
  })
  @ApiOperation(TranslationDoc.updateTranslation)
  @ApiOkResponse({
    type: TranslateResponse,
  })
  @Put('/:language_code/:key')
  async updateTranslation(
    @Param('key') key: string,
    @Param('language_code') languageCode: string,
    @Body() translationDto: UpdateTranslateDto,
  ) {
    return this.translationService.updateTranslation(
      key,
      languageCode,
      translationDto,
    );
  }

  @ApiBody({
    type: CreateTranslateDto,
  })
  @ApiOperation(TranslationDoc.createTranslation)
  @ApiOkResponse({
    type: TranslateResponse,
  })
  @Post()
  async createTranslation(@Body() translationDto: CreateTranslateDto) {
    return this.translationService.createTranslation(translationDto);
  }

  @ApiOperation(TranslationDoc.getTranslations)
  @ApiOkResponse({
    type: [TranslateResponse],
  })
  @Get()
  async getTranslations() {
    return this.translationService.getTranslations();
  }

  @ApiOperation(TranslationDoc.getTranslationByKey)
  @ApiOkResponse({
    type: [TranslateResponse],
  })
  @Get('/:key')
  async getTranslationByKey(@Param('key') key: string) {
    return this.translationService.getTranslationsByKey(key);
  }

  @ApiOperation(TranslationDoc.getUniqueTranslation)
  @ApiOkResponse({
    type: TranslateResponse,
  })
  @Get('/:language_code/:key')
  async getTranslation(
    @Param('key') key: string,
    @Param('language_code') language_code: string,
  ) {
    return this.translationService.getTranslation({ key, language_code });
  }

  @ApiOperation(TranslationDoc.deleteTranslation)
  @Delete()
  async deleteTranslation(
    @Query('language_code') language_code: string,
    @Query('key') key: string,
  ) {
    if (!key && language_code) {
      return this.translationService.deleteTranslationsByLanguageCode(
        language_code,
      );
    }

    if (!language_code && key) {
      return this.translationService.deleteTranslationsByKey(key);
    }

    if (key && language_code) {
      return this.translationService.deleteTranslation(key, language_code);
    }

    throw new BadRequestException();
  }
}
