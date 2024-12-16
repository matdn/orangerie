/* eslint-disable no-nested-ternary */

import dotenv from 'dotenv'
import { readFileSync, writeFileSync } from 'fs'

async function bootstrap() {
  const { argv } = process

  const isProd = argv.some((arg) => ['production', 'prod'].includes(arg))
  const isStag = argv.some((arg) => ['staging', 'stag'].includes(arg))
  const envSrc = isProd
    ? '.env.production'
    : isStag
      ? '.env.staging'
      : '.env.local'

  const { parsed: env } = dotenv.config({ path: envSrc })
  console.debug(env)

  const manifestSrc = 'bin/imsmanifest.xml'
  const manifest = readFileSync(manifestSrc, { encoding: 'utf8' })
    .replace(/favie-boilerplate/g, env.VITE_GAME_TITLE)
  writeFileSync(manifestSrc, manifest, { encoding: 'utf8' })
}

bootstrap()
