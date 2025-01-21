import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordEntity } from 'src/modules/entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordStore: Repository<RecordEntity>,
  ) {}
  async list() {
    return await this.recordStore.find();
  }

  async save(data) {
    let tmpData = new RecordEntity();
    tmpData = Object.assign(tmpData, data);
    await this.recordStore.save(tmpData);
    return {
      message: '新增成功',
    };
  }
}
