import { IsBoolean, IsOptional, IsString } from 'class-validator'

import { PartialType } from '@nestjs/swagger'

import { CreateArtistDto } from './create-artist.dto'

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsOptional()
  name: string

  @IsBoolean()
  @IsOptional()
  grammy: boolean
}
