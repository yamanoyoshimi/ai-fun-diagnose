import type { NextPage } from 'next';
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import { DiagnoseValues } from '@/datas/diagnose';
import TextField from '@/components/admin/TextField';
import NeurmophicButton from '@/components/NeurmophicButton';
import { Title } from '@/components/admin/Title'
import axios from 'axios';
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'

interface DiagnoseInputForm extends DiagnoseValues {
  username: string
}

const Add: NextPage = () => {
  const router = useRouter()

  const [ isDone, setIsDone ] = useState(false)
  const [ resultText, setResultText ] = useState('')
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm<DiagnoseInputForm>();

  const onSubmit: SubmitHandler<DiagnoseInputForm> = async (data) => {
    try {
      const { username, ...diagnose} = data
      await axios.post('/api/diagnose/', diagnose)
    } catch (e) {
      console.log(e)
      return
    }
    setIsDone(true)
    setResultText('')
  }

  const tryIt = async (): Promise<void> => {
    try {
      const datas = {
        prompt: getValues('prompt'),
        maxToken: `${getValues('maxToken')}`,
        temperature: `${getValues('temperature')}`,
        presence_penalty: `${getValues('presence_penalty')}`,
        frequency_penalty: `${getValues('frequency_penalty')}`,
        username: `${getValues('username')}`
      }
      const params = new URLSearchParams(datas)

      const res = await axios.get(`/api/try?${params.toString()}`)
      const data = await res.data
      setResultText(res.data.chat)
      setIsDone(false)

    } catch (e) {
      console.log(e)
      return
    }
  }

  return (
    <SeparatedLayout>
      <Box sx={{
            justifyContent: 'space-between',
            display: 'flex'}}>
        <Title text={'プロンプト追加'} />
        <NeurmophicButton text={'リストに戻る'} func={() => {
              router.push('/admin/list')
            }} size={'small'} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField control={control} label={'タイトル'} name={'title'} placeholder={'タイトル'} multiline />
        <TextField control={control} label={'説明文'} name={'description'} placeholder={'説明文'} multiline />
        <TextField control={control} label={'プロンプト'} name={'prompt'} placeholder={'プロンプト'} multiline />
        <TextField control={control} label={'maxToken'} name={'maxToken'} defaultValue={300} placeholder={'maxToken'}  />
        <TextField control={control} label={'temperature'} name={'temperature'} defaultValue={1} placeholder={'temperature'}  />
        <TextField control={control} label={'presence_penalty'} name={'presence_penalty'} defaultValue={0.5} placeholder={'presence_penalty'}  />
        <TextField control={control} label={'frequency_penalty'} name={'frequency_penalty'} defaultValue={0.1} placeholder={'frequency_penalty'}  />
        <TextField control={control} label={'検証用: 名前'} name={'username'} placeholder={'プロンプトに「$name」と入れた箇所に、このテキストボックスの値が入ります'}/>
        <Box sx={{
            justifyContent: 'space-between',
            display: 'flex'}}>
          <NeurmophicButton text={'結果を出力'} func={tryIt} type={'button'} />
          <NeurmophicButton text={'プロンプト追加'} func={() => {}} type={'submit'} />
        </Box>
      </form>
      <Box sx= {{
          marginTop: '32px',
          marginBottom: '50px'
      }}>
      {isDone && 
      <Typography
      sx={{
        marginTop: 'calc(64/750*100vw)',
        lineHeight: '2',
        fontSize: 'calc(48/750*100vw)',
        color: 'red',
        textAlign: 'center',
        '@media screen and (min-width:913px)': {
          marginTop: '32px',
          fontSize: '24px',
        },
      }}
      >
        追加完了しました
      </Typography>}
      {resultText && <>
        <Title text={'出力結果'} />
        <Typography
        sx={{
            marginTop: 'calc(64/750*100vw)',
            lineHeight: '2',
            fontSize: 'calc(48/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginTop: '32px',
              fontSize: '24px',
            },
          }}
        >
          {resultText}
        </Typography>
      </>}
      </Box>
    </SeparatedLayout>
  );
};

export async function getServerSideProps() {
  return { props: {} };
}

export default Add;
