import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

import { PartialType } from '@nestjs/swagger'

import { CreateAlbumDto } from './create-album.dto'

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsOptional()
  name: string

  @IsInt()
  @IsOptional()
  year: number

  @IsUUID()
  @IsOptional()
  artistId: string | null
}
