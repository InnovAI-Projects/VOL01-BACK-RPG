import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica estabilidade da conexão com o banco.' })
  @ApiResponse({ status: 200, description: 'Banco online' })
  @ApiResponse({ status: 503, description: 'Banco offline' })
  @HealthCheck()
  check() {
    return this.healthService.healthCheck();
  }
}
