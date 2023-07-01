import { Model } from 'mongoose'
import { IGenericErrorMessage } from './error'
import { IUser } from '../app/modules/users/user.interface'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type UserModel = Model<IUser, Record<string, unknown>>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
