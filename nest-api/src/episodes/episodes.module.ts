import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

@Module({
  imports: [ConfigModule], // we import the config module here
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
