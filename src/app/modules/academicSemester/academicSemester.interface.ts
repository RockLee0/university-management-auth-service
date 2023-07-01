//declare the interface

import { Model } from 'mongoose'

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterCodes = '01' | '02' | '03'
export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall'

//optimized code//
export type IAcademicSemester = {
  title: IAcademicSemesterTitles
  year: string
  code: IAcademicSemesterCodes
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type IAcademicSemesterFilters = {
  searchTerm?: string
}

///unoptimized code//
// export type IAcademicSemester = {
//     title: 'Autumn'|'Summer'|'Fall';
//     year: number;
//     code: '01'|'02'|'03';
//     startMonth:Month;
//     endMonth:Month;
//   }

//create a model

export type IAcademicSemesterModel = Model<IAcademicSemester>
