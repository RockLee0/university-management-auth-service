import express from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../users/middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

// UPDATE data
router.patch(
  '/:id',
  AcademicSemesterController.updateSemester,

  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema)
)

// GET single semester
router.get('/:id', AcademicSemesterController.getSingleSemester)

// GET all semester
router.get('/', AcademicSemesterController.getAllSemesters)

// DELETE semester
router.get('/', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoutes = router
