import { IsOptional, IsUUID } from "class-validator";

export class BaseDTO {
  @IsUUID()
  @IsOptional()
  id!: string;

  @IsUUID()
  @IsOptional()
  createdAt!: Date;

  @IsUUID()
  @IsOptional()
  updatedAt!: Date;
}