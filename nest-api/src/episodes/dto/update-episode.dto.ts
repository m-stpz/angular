import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
