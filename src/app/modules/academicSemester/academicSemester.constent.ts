import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface'

export const AcademicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const AcademicSemeterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterMapper: {
  [key: string]: string
} = {
  Autum: '1',
  Summer: '2',
  Fall: '3',
}

export const academicSemesterSearchableFields = ['title', 'code', 'year']

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
