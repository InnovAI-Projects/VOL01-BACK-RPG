import { Injectable } from '@nestjs/common';
import { ObjectCreateType } from './types/object-create.type';
import { ObjectUpdateType } from './types/object-update.type';

@Injectable()
export class ObjectsService {
  constructor() {}

  instantiateVar(body: ObjectCreateType) {
    const createdAt = new Date().toJSON();
    body.isActive = true;
    body.createdAt = createdAt;
    body.updatedAt = createdAt;
  }

  updateVar(body: ObjectUpdateType) {
    const updatedAt = new Date().toJSON();
    body.updatedAt = updatedAt;
  }
}
