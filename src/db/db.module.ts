import { Module } from '@nestjs/common'

import { InMemoryDb } from './inMemoryDB'

@Module({
  providers: [InMemoryDb],
  exports: [InMemoryDb],
})
export class DbModule {}
