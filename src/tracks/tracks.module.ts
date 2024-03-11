import { Module, forwardRef } from '@nestjs/common'

import { TracksService } from './tracks.service'
import { TracksController } from './tracks.controller'
import { DbModule } from 'src/db/db.module'
import { FavoritesModule } from 'src/favorites/favorites.module'

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  exports: [TracksService],
})
export class TracksModule {}
