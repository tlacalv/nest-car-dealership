/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'The brand must be a string' })
  readonly brand: string;
  @IsString()
  // @MinLength(3)
  readonly model: string;
}
