import { Schema, model } from 'mongoose'
import { IAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterTitles,
  academicSemesterCodes,
  AcademicSemeterMonths,
} from './academicSemester.constent'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const AcademicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: AcademicSemesterTitles,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCodes,
  },
  startMonth: {
    type: String,
    required: true,
    enum: AcademicSemeterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: AcademicSemeterMonths,
  },
})

AcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Same semester data is detected')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema
)
