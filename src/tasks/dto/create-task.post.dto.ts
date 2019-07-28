import { IsNotEmpty } from 'class-validator';
export class CreateTaskPostDTO {
  @IsNotEmpty() title: string;
  @IsNotEmpty() description: string;
}
