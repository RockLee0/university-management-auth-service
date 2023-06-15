import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', UserRoutes)
// // //testing
// app.get('/',async(req: Request, res: Response,next:NextFunction) => {
// //  next('THis a Big errrr'); //by using this,it shows the error globally
//  console.log(x);
// })

//global error handler
app.use(globalErrorHandler)

export default app
