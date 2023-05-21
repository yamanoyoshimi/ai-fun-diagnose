import type { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import theme from '@/styles/commonTheme';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import NeurmophicBox from '@/components/NeurmophicBox';
import NeurmophicButton from '@/components/NeurmophicButton';

function Error({ statusCode }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>AI面白診断 | エラー</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SeparatedLayout>
          <Box sx={{ marginTop: '32px' }}>
            <NeurmophicBox paddingVertical={90} paddingHorizontal={24}>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontSize: 'calc(32/750*100vw)',
                  fontWeight: 'bold',
                  lineHeight: '2',
                  '@media screen and (min-width:913px)': { fontSize: '16px' },
                }}
              >
                申し訳ありません、技術的な問題が発生しました。再度トップページからお試しになるか、時間を少し置いてからお試しください。
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 'calc(160/750*100vw) auto 0',
                  '@media screen and (min-width:913px)': {
                    margin: '80px auto 0',
                  },
                }}
              >
                <NeurmophicButton
                  text={'TOPへ'}
                  func={() => {
                    router.push('/');
                  }}
                  color={'#513FBF'}
                />
              </Box>
            </NeurmophicBox>
          </Box>
        </SeparatedLayout>
      </ThemeProvider>
    </>
  );
}

export default Error;
