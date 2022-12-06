import { ApiProperty } from '@nestjs/swagger';
export class CreateImageDto {
  @ApiProperty()
  filename: string;
}
