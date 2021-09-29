import * as Database from 'sequelize'
import * as Sentry from '@App/Sentry'
import * as Logger from '@App/Logger'

const sentry = Sentry.Context
const logger = Logger.Context

const transaction = sentry.startTransaction({
  name: 'Sequelize',
  op: 'App/Sequelize',
  description: 'Sequelize contexto to instance database.',
})

const Sequelize = new Database.Sequelize({
  dialect: 'sqlite',
  storage: 'temp/content.sqlite',
  logging: (...message) => logger.info(message),
})

try {
  Sequelize.authenticate()
    .then(() => {
      logger.info('[App/Data] Connection has been established successfully!')
    })
    .catch((error) => {
      throw new Error(error)
    })
} catch (error) {
  logger.error(error)
  sentry.captureException(error)
} finally {
  transaction.finish()
}

/**
 * Export database settings as global context
 * for better access to processes and procedures.
 */
export const Context = Sequelize
