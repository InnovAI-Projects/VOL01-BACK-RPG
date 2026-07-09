export interface HealthResponse {
  status: string;
  database: string | undefined;
  timestamp: string;
}
