import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { UserModel } from '../../../interfaces/common'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const User = model<IUser, UserModel>('User', userSchema)
