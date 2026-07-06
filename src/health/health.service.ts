import { Injectable } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

interface HealthResponse {
  status: string;
  database: string;
  timestamp: string;
}

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  async healthCheck() {
    const json = await this.health.check([
      () => this.db.pingCheck('db.prototype'),
    ]);
    const timestamp = new Date().toJSON();
    return {
      status: json.status,
      database: json.info?.['db.prototype']?.status,
      timestamp,
    };
  }
}
