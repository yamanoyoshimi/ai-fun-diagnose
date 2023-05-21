import { Diagnose } from '@/datas/diagnose'
import S3 from 'aws-sdk/clients/s3'

const bucketName = 'ai-fun-diagnose-s3'; // 保存先のバケット名

class DiagnoseDb {
  bucket: S3

  constructor () {
    const accessKeyId = process.env.KEYID
    const secretAccessKey = process.env.ACCESSKEY
  
    this.bucket = new S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: 'ap-northeast-1',
    })
  }

  public async read (): Promise<Diagnose[]> {
    const data = await this.bucket.getObject({
      Bucket: bucketName,
      Key: 'diagnose.json'
    }).promise()
    return JSON.parse(data.Body.toString()) as Diagnose[]
  }

  public async write (data: Diagnose[]) {
    await this.bucket.putObject({
      Bucket: bucketName,
      Key: 'diagnose.json',
      Body: JSON.stringify(data)
    }).promise()
  }
}

export const diagnoseDb = new DiagnoseDb()