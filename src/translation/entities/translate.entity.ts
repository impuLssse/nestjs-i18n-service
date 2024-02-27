import { Column, Entity, Index } from 'typeorm';

@Index(
  'translation_key_and_language_code_unique_index',
  ['key', 'language_code'],
  {
    unique: true,
  },
)
@Entity({ name: 'translations', schema: 'localization' })
export class TranslateEntity {
  @Column({
    primaryKeyConstraintName: 'translation_key_and_language_code_unique_index',
    primary: true,
  })
  key: string;

  @Column({
    primaryKeyConstraintName: 'translation_key_and_language_code_unique_index',
    primary: true,
  })
  language_code: string;

  @Column({ type: 'text' })
  phrase: string;

  constructor(dto: TranslateEntity) {
    Object.assign(this, dto);
  }
}
