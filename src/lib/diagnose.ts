import { DiagnoseValues } from '@/datas/diagnose'
import { getFormattedDate } from '@/util/dateFormatter'

// TODO データ操作実装
export const addDiagnose = (source: DiagnoseValues) => {
  const createdDate = getFormattedDate(new Date, 'YYYY/MM/DD hh:mm:ss')
}


export const updateDiagnose = (source: DiagnoseValues) => {
  const createdDate = getFormattedDate(new Date, 'YYYY/MM/DD hh:mm:ss')
}

export const snapshot = () => {

}