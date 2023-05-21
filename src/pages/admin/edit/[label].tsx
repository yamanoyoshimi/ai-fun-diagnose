import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import { getDiagnose, DiagnoseValues, Diagnose } from '@/datas/diagnose';
import TextField from '@/components/admin/TextField';
import NeurmophicButton from '@/components/NeurmophicButton';
import Box from '@mui/material/Box'

import { Title } from '@/components/admin/Title'
import axios from 'axios';

interface Props {
  diagnose: Diagnose
  label: string
}

const Home: NextPage<Props> = ({ diagnose, label }) => {
  const router = useRouter();

  const { title, description, prompt, maxToken, temperature, presence_penalty, frequency_penalty, createdDate } = diagnose;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DiagnoseValues>();

  const onSubmit: SubmitHandler<DiagnoseValues> = async (data) => {
    await axios.put('/api/diagnose/', { ...data, label })
  }

  return (
    <SeparatedLayout>
      <Box sx={{
            justifyContent: 'space-between',
            display: 'flex'}}>
        <Title text={'プロンプト編集'} />
        <NeurmophicButton text={'リストに戻る'} func={() => {
              router.push('/admin/list')
            }} size={'small'} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField control={control} label={'タイトル'} name={'title'} defaultValue={title} placeholder={'タイトル'} multiline />
        <TextField control={control} label={'説明文'} name={'description'} defaultValue={description} placeholder={'説明文'} multiline />
        <TextField control={control} label={'プロンプト'} name={'prompt'} defaultValue={prompt} placeholder={'プロンプト'} multiline />
        <TextField control={control} label={'maxToken'} name={'maxToken'} defaultValue={maxToken} placeholder={'maxToken'}  />
        <TextField control={control} label={'temperature'} name={'temperature'} defaultValue={temperature} placeholder={'temperature'}  />
        <TextField control={control} label={'presence_penalty'} name={'presence_penalty'} defaultValue={presence_penalty} placeholder={'presence_penalty'}  />
        <TextField control={control} label={'frequency_penalty'} name={'frequency_penalty'} defaultValue={frequency_penalty} placeholder={'frequency_penalty'}  />
        <NeurmophicButton text={'変更'} func={() => {}} type={'submit'} />
      </form>
    </SeparatedLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { label } = params
  return { 
    props: {
      label,
      diagnose: await getDiagnose(label)
    } 
  }
}

export default Home;
