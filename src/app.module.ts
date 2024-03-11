import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DbModule } from './db/db.module'
import { ArtistsModule } from './artists/artists.module'
import { TracksModule } from './tracks/tracks.module'
import { AlbumsModule } from './albums/albums.module'
import { FavoritesModule } from './favorites/favorites.module'

@Module({
  imports: [
    UsersModule,
    DbModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
