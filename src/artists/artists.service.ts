import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { CreateArtistDto } from './dto/create-artist.dto'
import { UpdateArtistDto } from './dto/update-artist.dto'
import { InMemoryDb } from 'src/db/inMemoryDB'
import { FavoritesService } from 'src/favorites/favorites.service'
import { AlbumsService } from 'src/albums/albums.service'
import { TracksService } from 'src/tracks/tracks.service'

@Injectable()
export class ArtistsService {
  constructor(
    private db: InMemoryDb,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = { ...createArtistDto, id: uuidv4() }
    this.db.artists.push(newArtist)

    return newArtist
  }

  findAll() {
    return this.db.artists
  }

  findOne(id: string, skipErrors = false) {
    const artist = this.db.artists.find((artist) => artist.id === id)

    if (!artist && !skipErrors) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    if (!artist && skipErrors) {
      return null
    }

    return artist
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id)

    if (artistIndex === -1) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedArtist = Object.assign(this.db.artists[artistIndex], {
      ...updateArtistDto,
    })
    this.db.artists[artistIndex] = updatedArtist

    return updatedArtist
  }

  remove(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id)

    if (artistIndex === -1) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.artists.splice(artistIndex, 1)

    this.albumService.removeArtist(id)
    this.trackService.removeArtist(id)
    this.favoritesService.removeArtistFromFav(id, true)
  }
}
