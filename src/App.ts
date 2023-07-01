import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandler'

import routes from './app/routes'
import httpStatus from 'http-status'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)
// // //testing
// app.get('/',async(req: Request, res: Response,next:NextFunction) => {
// //  next('THis a Big errrr'); //by using this,it shows the error globally
//  console.log(x);
// })

//global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found route',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API NOT FOUND',
      },
    ],
  })
  next()
})

export default app
