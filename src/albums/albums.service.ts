import { v4 as uuidv4 } from 'uuid'

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common'

import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'
import { InMemoryDb } from 'src/db/inMemoryDB'
import { FavoritesService } from 'src/favorites/favorites.service'
import { TracksService } from 'src/tracks/tracks.service'

@Injectable()
export class AlbumsService {
  constructor(
    private db: InMemoryDb,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { ...createAlbumDto, id: uuidv4() }
    this.db.albums.push(newAlbum)

    return newAlbum
  }

  findAll() {
    return this.db.albums
  }

  findOne(id: string, skipErrors = false) {
    const album = this.db.albums.find((album) => album.id === id)

    if (!album && !skipErrors) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    if (!album && skipErrors) {
      return null
    }

    return album
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id)

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedAlbum = Object.assign(this.db.albums[albumIndex], {
      ...updateAlbumDto,
    })
    this.db.albums[albumIndex] = updatedAlbum

    return updatedAlbum
  }

  remove(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id)

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.albums.splice(albumIndex, 1)

    this.tracksService.removeAlbum(id)
    this.favoritesService.removeAlbumFromFav(id, true)
  }

  removeArtist(id: string) {
    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        const updateAlbumDto = new UpdateAlbumDto()

        updateAlbumDto.artistId = null

        this.update(album.id, updateAlbumDto)
      }
    })
  }
}
