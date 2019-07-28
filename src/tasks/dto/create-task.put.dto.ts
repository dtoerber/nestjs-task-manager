import { IsNotEmpty } from 'class-validator';
export class CreateTaskPutDTO {
  @IsNotEmpty() id: string;
  @IsNotEmpty() title: string;
  @IsNotEmpty() description: string;
}
