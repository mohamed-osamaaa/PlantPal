import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlantDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(['daily', 'weekly', 'bi-weekly', 'monthly'])
    wateringSchedule?: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
}