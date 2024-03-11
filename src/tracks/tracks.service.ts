import { v4 as uuidv4 } from 'uuid'
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common'
import { CreateTrackDto } from './dto/create-track.dto'
import { UpdateTrackDto } from './dto/update-track.dto'
import { InMemoryDb } from 'src/db/inMemoryDB'
import { FavoritesService } from 'src/favorites/favorites.service'

@Injectable()
export class TracksService {
  constructor(
    private db: InMemoryDb,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = { ...createTrackDto, id: uuidv4() }
    this.db.tracks.push(newTrack)

    return newTrack
  }

  findAll() {
    return this.db.tracks
  }

  findOne(id: string, skipErrors = false) {
    const track = this.db.tracks.find((track) => track.id === id)

    if (!track && !skipErrors) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    if (!track && skipErrors) {
      return null
    }

    return track
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id)

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    const updatedTrack = Object.assign(this.db.tracks[trackIndex], {
      ...updateTrackDto,
    })
    this.db.tracks[trackIndex] = updatedTrack

    return updatedTrack
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id)

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.db.tracks.splice(trackIndex, 1)
    this.favoritesService.removeTrackFromFav(id, true)
  }

  removeArtist(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        const updateTrackDto = new UpdateTrackDto()

        updateTrackDto.artistId = null

        this.update(track.id, updateTrackDto)
      }
    })
  }

  removeAlbum(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        const updateTrackDto = new UpdateTrackDto()

        updateTrackDto.albumId = null

        this.update(track.id, updateTrackDto)
      }
    })
  }
}
