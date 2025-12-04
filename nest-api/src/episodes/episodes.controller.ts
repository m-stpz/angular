import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './types/episode.type';
import type { Sort } from './types/sort.type';
import { ConfigService } from 'src/config/config.service';

@Controller('episodes')
export class EpisodesController {
  // the service is injected into the controller

  /* 
  to inject the config service here, we needed:
  1. on `config.module`, export the `ConfigService`
  2. on `episodes.module` import the `ConfigModule`
  3. pass the `ConfigService` to the constructor 
  */
  constructor(
    private readonly service: EpisodesService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: Sort = 'desc') {
    return this.service.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: Episode['id']) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEpisodeDTO) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: Episode['id'], @Body() dto: UpdateEpisodeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: Episode['id']) {
    return this.service.delete(id);
  }
}
