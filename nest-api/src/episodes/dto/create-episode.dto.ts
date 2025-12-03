import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEpisodeDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
