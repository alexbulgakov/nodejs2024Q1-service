import { Module, forwardRef } from '@nestjs/common'

import { AlbumsService } from './albums.service'
import { AlbumsController } from './albums.controller'
import { DbModule } from 'src/db/db.module'
import { FavoritesModule } from 'src/favorites/favorites.module'
import { TracksModule } from 'src/tracks/tracks.module'

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    DbModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
