import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Catagory } from 'src/common/enum/type.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  author: string;

  @IsNumber()
  @ApiProperty()
  //  check lai
  catagory: Catagory;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  date: string;

  @ApiProperty({ required: false })
  numberPage: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imageId: string;

  @IsOptional()
  @ApiProperty({ required: false })
  image_url: Express.Multer.File;
  // price: number;
}
