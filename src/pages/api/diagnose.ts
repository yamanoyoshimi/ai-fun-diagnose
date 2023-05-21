import { DiagnoseValues, Diagnose } from '@/datas/diagnose'
import { getFormattedDate } from '@/util/dateFormatter'
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto'
import { diagnoseDb } from './db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'POST':
      const addSource = req.body as DiagnoseValues
      if (hasEmpty(addSource)) {
        res.status(400).send({})
        return 
      }
      await addDiagnose(addSource)
      res.status(200).send({})
      return
    case 'DELETE':
      if (!req.body?.label) {
        res.status(400).send({})
        return 
      }
      await deleteDiagnose(req.body.label)
      res.status(200).send({})
      return
    case 'PUT':
      const { label, ...updateSource } = req.body
      if (hasEmpty(updateSource)) {
        res.status(400).send({})
        return
      }
      await updateDiagnose(label, updateSource)
      return
    default:
      const data = await diagnoseDb.read()
      res.status(200).json(data) 
  }
}

const hasEmpty = ( source: DiagnoseValues ) => {
  return !source.description || 
  source.frequency_penalty > 1 || source.frequency_penalty < 0 || 
  !source.maxToken || 
  source.presence_penalty > 1 ||   source.presence_penalty < 0 ||
  !source.prompt ||
  source.temperature > 1 || source.temperature < 0 ||
  !source.title
}

const addDiagnose = async (source: DiagnoseValues) => {
  const data = await diagnoseDb.read()
  const label =  crypto.randomUUID()
  const createdDate = getFormattedDate(new Date, 'YYYY/MM/DD hh:mm:ss')
  data.push({ ...source, createdDate, label })
  await diagnoseDb.write(data)
}


const updateDiagnose = async (targetLabel: string ,source: DiagnoseValues) => {
  const data = await diagnoseDb.read()
  const index = data.findIndex(({ label }) => label === targetLabel)
  if (!~index) return
  const createdDate = getFormattedDate(new Date, 'YYYY/MM/DD hh:mm:ss')
  data.splice( index, 1, { label: targetLabel, ...source, createdDate } )
  await diagnoseDb.write(data)
}

const deleteDiagnose = async (targetLabel: string) => {
  const data = await diagnoseDb.read()
  const index = data.findIndex(({ label }) => label === targetLabel )
  if (!~index) return
  data.splice(index, 1)
  await diagnoseDb.write(data)
}

