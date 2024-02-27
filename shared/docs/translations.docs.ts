import { ApiResponse } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SwaggerResponses = {
  NotFoundException: ApiResponse({
    status: 404,
    description: 'Not Found',
  }),
  ForbiddenException: ApiResponse({
    status: 403,
    description: 'Forbidden.',
  }),
};

type ApiOperationObject = Partial<OperationObject>;

export namespace TranslationDoc {
  export const getTranslationByKey: ApiOperationObject = {
    description: 'Получение переводов по ключу',
  };

  export const deleteTranslation: ApiOperationObject = {
    description: 'Удаление перевода по ключу и языку',
  };

  export const deleteTranslationsByKey: ApiOperationObject = {
    description: 'Удаление переводов по ключу',
  };

  export const deleteTranslationsByLanguage: ApiOperationObject = {
    description: 'Удаление переводов по языку',
  };

  export const getUniqueTranslation: ApiOperationObject = {
    description: 'Получение уникального перевода по ключу и коду языка',
  };

  export const createTranslation: ApiOperationObject = {
    description: 'Создание перевода',
  };

  export const updateTranslation: ApiOperationObject = {
    description: 'Обновление перевода',
  };

  export const getTranslations: ApiOperationObject = {
    description: 'Получение всех переводов',
  };
}
