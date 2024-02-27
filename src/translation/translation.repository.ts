import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TranslateEntity } from './entities';
import { BaseRepository } from '@shared/utils';

@Injectable()
export class TranslateRepository extends BaseRepository<TranslateEntity> {
  constructor(dataSource: DataSource) {
    super(TranslateEntity, dataSource);
  }
}
