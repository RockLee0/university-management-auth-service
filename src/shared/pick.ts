///////// obj = req.query , key[]= ['page','limit','sortBy','orderBy']
// ekta function pick nam er jeta obj and key input nibe
//
// const pick=<T extends object,k extends keyof T>(obj:T,keys:[])={

// }

// const pick=<T extends Record<string,unknown>,k extends keyof T>(
//     obj:T,
//     keys:k[]): partial<T>=
//     {
//        const  finalObj:Partial<T>={}
//  for(const key of keys){
//     if(obj && Object.hasOwnProperty,call(obj,key))
//     {
//         finalObj[key]=obj[key]
//     }
//  }
//  return finalObj;
// }

// export default pick;

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {}

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key]
    }
  }
  return finalObj
}

export default pick
