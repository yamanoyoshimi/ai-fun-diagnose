import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Theme } from '@/datas/diagnose';
import NeurmophicTextField from '@/components/NeurmophicTextField';
import NeurmophicButton from '@/components/NeurmophicButton';
import * as gtag from '@/lib/gtag';

type ThemeDetailProps = {
  themeDetail: Theme;
};

const ThemeDetail = (props: ThemeDetailProps) => {
  const router = useRouter();
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // promise内部でエラーでた場合ハンドリングできないので吐き直す
  if (error) {
    throw new Error();
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>();

  // Char GPT API
  const callAI = async (label: string, name: string): Promise<any> => {
    const res = await axios.get(`/api/chatgpt?name=${name}&label=${label}`);
    const data = await res.data;
    return Promise.resolve(data.chat);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    {
      /* コンバージョンGA送信 */
    }
    gtag.event({
      action: 'StartAiDiagnose',
      category: 'AiDiagnose',
      label: props.themeDetail.title,
    });

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomName = characters.charAt(Math.floor(Math.random() * 26));
    const name = data.name ? data.name : `名無しの${randomName}さん`;
    setIsLoading(true);
    try {
      const resChat = await callAI(props.themeDetail.label, name);
      if (resChat) {
        setResultText(resChat);
        router.push({
          pathname: `/themes/result/${props.themeDetail.label}`,
          query: { result: resChat, name: name },
        });
      }
    } catch {
      setError(true);
    }
  };

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-25%)',
            width: 'calc(600/750*100vw)',
            height: '100vh',
            '@media screen and (min-width:913px)': { width: '300px' },
          }}
        >
          <Box
            sx={{
              width: 'calc(72/750*100vw)',
              margin: '0 auto',
              '@media screen and (min-width:913px)': { width: '36px' },
            }}
          >
            <CircularProgress
              sx={{
                fontSize: 'calc(72/750*100vw)',
                color: '#1B00BF',
                '@media screen and (min-width:913px)': { fontSize: '36px' },
              }}
            />
          </Box>
          <Typography
            sx={{
              marginTop: 'calc(104/750*100vw)',
              letterSpacing: '0.18em',
              textAlign: 'center',
              fontSize: 'calc(48/750*100vw)',
              fontWeight: 'bold',
              '@media screen and (min-width:913px)': {
                marginTop: '52px',
                fontSize: '24px',
              },
            }}
          >
            AIが診断中..
          </Typography>
          <Typography
            sx={{
              marginTop: 'calc(32/750*100vw)',
              lineHeight: '2',
              letterSpacing: '0.18em',
              textAlign: 'center',
              fontSize: 'calc(40/750*100vw)',
              '@media screen and (min-width:913px)': {
                marginTop: '16px',
                fontSize: '20px',
              },
            }}
          >
            不思議な結果ならもう一度試してみてね！AIが考え直すよ！
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 'calc(64/750*100vw)',
            paddingBottom: 'calc(128/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginTop: '32px',
              paddingBottom: '64px',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              lineHeight: '1.7142857143',
              letterSpacing: '0.18em',
              fontSize: 'calc(56/750*100vw)',
              fontWeight: 'bold',
              '@media screen and (min-width:913px)': { fontSize: '28px' },
            }}
          >
            {props.themeDetail.title}
          </Typography>
          <Typography
            sx={{
              marginTop: 'calc(32/750*100vw)',
              lineHeight: '2',
              letterSpacing: '0.18em',
              fontSize: 'calc(40/750*100vw)',
              '@media screen and (min-width:913px)': { fontSize: '20px' },
            }}
          >
            {props.themeDetail.description}
          </Typography>
          <Box
            sx={{
              marginTop: 'calc(96/750*100vw)',
              '@media screen and (min-width:913px)': { marginTop: '48px' },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ width: '100%', margin: '0 auto' }}>
                <NeurmophicTextField control={control} label={'診断したい名前（15文字まで）'} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 'calc(48/750*100vw) auto 0',
                  '@media screen and (min-width:913px)': {
                    margin: '24px auto 0',
                  },
                }}
              >
                <NeurmophicButton text={'AI診断する'} func={() => {}} type={'submit'} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 'calc(80/750*100vw) auto 0',
                  '@media screen and (min-width:913px)': {
                    margin: '40px auto 0',
                  },
                }}
              >
                <Link
                  sx={{
                    fontSize: 'calc(36/750*100vw)',
                    color: '#000',
                    textDecoration: 'none',
                    '@media screen and (min-width:913px)': { fontSize: '18px' },
                  }}
                  href={'/'}
                >
                  TOPへ
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ThemeDetail;
