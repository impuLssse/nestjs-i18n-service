import { ApiProperty, PickType } from '@nestjs/swagger';
import { TranslateEntity } from '@translation/entities';
import { IsString } from 'class-validator';

export class CreateTranslateDto implements TranslateEntity {
  @ApiProperty({
    type: String,
    description: 'Ключ перевода',
    example: 'Новости',
  })
  @IsString()
  key: string;

  @ApiProperty({
    type: String,
    description: 'Фраза',
    example: 'News',
  })
  @IsString()
  phrase: string;

  @ApiProperty({
    type: String,
    description: 'Язык на котором переведан фраза',
    example: 'en',
  })
  @IsString()
  language_code: string;
}

export class UpdateTranslateDto extends PickType(CreateTranslateDto, [
  'phrase',
]) {}
