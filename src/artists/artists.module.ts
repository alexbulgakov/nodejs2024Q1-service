import { Module, forwardRef } from '@nestjs/common'

import { ArtistsService } from './artists.service'
import { ArtistsController } from './artists.controller'
import { DbModule } from 'src/db/db.module'
import { FavoritesModule } from 'src/favorites/favorites.module'
import { TracksModule } from 'src/tracks/tracks.module'
import { AlbumsModule } from 'src/albums/albums.module'

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    DbModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
