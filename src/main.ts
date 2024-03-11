import { readFile } from 'fs/promises'
import { join } from 'path'
import { parse } from 'yaml'

import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  )
  SwaggerModule.setup('docs', app, parse(document))

  await app.listen(process.env.PORT || 4000)
}
bootstrap()
