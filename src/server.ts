import mongoose from 'mongoose'
import config from './config'
import app from './App'
import { Server } from 'http'
import { logger, errorlogger } from './shared/logger'
process.on('uncaughtException', error => {
  // console.log('Uncaught exception is detected..')
  errorlogger.error(error)
  process.exit(1)
})
let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(2)
    }
  })
}

bootstrap()

process.on('SIGTERN', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
