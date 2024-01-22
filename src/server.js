/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()

  // Xử lý CORS
  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello Nguyen Duc Trung, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng Server
  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas!')
  })
}

// Chỉ khi kết nối tới Database thành công thì mới Start Server Backend lên
// IIFE
;(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Chỉ khi kết nối tới Database thành công thì mới Start Server Backend lên
// console.log('1. Connecting to MongoDB Cloud Atlas...')
// CONNECT_DB()
//   .then(() => {
//     console.log('2. Connected to MongoDB Cloud Atlas!')
//   })
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
