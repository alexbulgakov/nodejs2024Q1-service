import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common'

import { FavoritesService } from './favorites.service'
import { FavoritesResponse } from './entities/favorite.entity'

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll()
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFav(id)
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFav(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.favoritesService.removeTrackFromFav(id)
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFav(id)
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFav(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.favoritesService.removeAlbumFromFav(id)
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFav(id)
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFav(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.favoritesService.removeArtistFromFav(id)
  }
}
