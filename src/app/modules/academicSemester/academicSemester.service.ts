import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterMapper,
  academicSemesterSearchableFields,
} from './academicSemester.constent'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IpaginationOption } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

//01
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  const createdSemester = await AcademicSemester.create(payload)

  if (academicSemesterMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Semester is not matched with year'
    )
  }
  /////////////////////
  if (!createdSemester) {
    throw new Error('Failed to create academic semester!')
  }
  return createdSemester
}

//02
const getAllSemestersService = async (
  paginationOptions: IpaginationOption,
  filters: IAcademicSemesterFilters
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // const {page=1,limit=10}=paginationOptions;
  // const skip=(page-1)*limit;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters

  ///////////////////
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  ///////////old way
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];
  //////search term new way:
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  ///////////for filtersData
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  /////////Making a where Condition
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  //query on model:
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  // return result;
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//03
const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  //query on model:
  const result = await AcademicSemester.findById(id)
  return result
}

//04
const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterMapper[payload.title] !== payload.code
  ) {
    throw new Error('Failed to create academic semester!')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

//05
const deleteSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  //query on model:
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

//EXPORT
export const AcademicSemesterService = {
  createSemester,
  getAllSemestersService,
  getSingleSemesterService,
  updateSemesterService,
  deleteSemesterService,
}
