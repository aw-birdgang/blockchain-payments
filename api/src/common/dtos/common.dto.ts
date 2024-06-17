import { IsString, IsInt, IsOptional } from 'class-validator';

export class CommonDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
