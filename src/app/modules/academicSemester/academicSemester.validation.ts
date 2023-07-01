import { z } from 'zod'
import {
  AcademicSemesterTitles,
  academicSemesterCodes,
  AcademicSemeterMonths,
} from './academicSemester.constent'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required ',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...AcademicSemeterMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...AcademicSemeterMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
})

// const updateAcademicSemesterZodSchema = z.object({
//   body: z.object
//   ({
//     title: z.enum([...AcademicSemesterTitles] as [string,...string[]], {
//       required_error: 'Title is required',
//     }),
//     year: z.string({
//       required_error: 'Year is required ',
//     }),
//     code: z.enum([...academicSemesterCodes] as [string,...string[]]),
//     startMonth: z.enum([...AcademicSemeterMonths] as [string, ...string[]], {
//       required_error: 'Start month is needed',
//     }),
//     endMonth:  z.enum([...AcademicSemeterMonths] as [string, ...string[]], {
//       required_error: 'End month is needed',
//     }),
//   }).refine(data=>(data.body.title && data.body.code)||(!data.body.title && !data.body.code ),{
//     message:'input of both title and code required'
//   })
// });
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...AcademicSemeterMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemeterMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
