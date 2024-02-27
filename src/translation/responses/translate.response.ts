import { ApiProperty } from '@nestjs/swagger';
import { TranslateEntity } from '@translation/entities';

export class TranslateResponse implements TranslateEntity {
  @ApiProperty({
    type: String,
    description: 'Ключ перевода',
    example: 'Новости',
  })
  key: string;

  @ApiProperty({
    type: String,
    description: 'Фраза',
    example: 'News',
  })
  phrase: string;

  @ApiProperty({
    type: String,
    description: 'Язык на котором переведан фраза',
    example: 'en',
  })
  language_code: string;
}
