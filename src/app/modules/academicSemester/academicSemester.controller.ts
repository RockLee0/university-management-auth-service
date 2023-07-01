import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFeilds } from '../../../constants/pagination'
import { academicSemesterFilterableFields } from './academicSemester.constent'

//1(POST)
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
  //   res.status(200).json({
  //   success: true,
  //   message: 'Academic semester is created successfully!',
  //   data: result,
  // });
})

//2(GET)
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  //old way
  // const paginationOptions={
  //   page:Number(req.query.page),
  //   limit:Number(req.query.limit),
  //   sortBy:req.query.sortBy,
  //   sortOrder:req.query.sortOrder
  // }

  //new way
  const paginationOptions = pick(req.query, paginationFeilds)

  //for searching
  const filters = pick(req.query, academicSemesterFilterableFields)

  const result = await AcademicSemesterService.getAllSemestersService(
    paginationOptions,
    filters
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

//3(GET)
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingleSemesterService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester retrived successfully',
    data: result,
  })
})

//4(UPDATE)
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  const result = await AcademicSemesterService.updateSemesterService(
    id,
    updateData
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data updated successfully',
    data: result,
  })
})
//5(DELETE)
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.deleteSemesterService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data updated successfully',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
