import { Module, forwardRef } from '@nestjs/common'

import { FavoritesService } from './favorites.service'
import { FavoritesController } from './favorites.controller'
import { DbModule } from 'src/db/db.module'
import { TracksModule } from 'src/tracks/tracks.module'
import { AlbumsModule } from 'src/albums/albums.module'
import { ArtistsModule } from 'src/artists/artists.module'

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    DbModule,
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
