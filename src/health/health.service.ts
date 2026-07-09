import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthResponse } from './interfaces/health-response.interface';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  async healthCheck(): Promise<HealthResponse> {
    const json = await this.health.check([
      () => this.db.pingCheck('db.prototype'),
    ]);
    const timestamp = new Date().toJSON();
    if (json.status === 'error') {
      throw new InternalServerErrorException('database could not be connected');
    }
    return {
      status: json.status,
      database: json.info?.['db.prototype']?.status,
      timestamp,
    };
  }
}
