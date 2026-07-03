import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  isActive: Boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
