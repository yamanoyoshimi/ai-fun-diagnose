import * as React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Theme } from '@/datas/diagnose';
import NeurmophicBox from '@/components/NeurmophicBox';

type ThemesProps = {
  themes: Theme[];
};

const ThemeList = (props: ThemesProps) => {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          marginTop: 'calc(64/750*100vw)',
          paddingBottom: 'calc(40/750*100vw)',
          '@media screen and (min-width:913px)': {
            marginTop: '32px',
            paddingBottom: '20px',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 'calc(-1*48/750*100vw)',
            width: '100vw',
            '& img': {
              width: '100%',
              height: 'auto',
            },
            '@media screen and (min-width:913px)': {
              maxWidth: '640px',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
        >
          <img
            src={'/hero.jpg'}
            alt="「AIおもしろ診断」は、いま話題のチャットGPT AIが答える診断サイトです！名前を送信するだけでAIがお題にあった診断結果を回答するよ！友達とシェアして盛り上がろう！"
          />
        </Box>
        <Box
          sx={{
            height: 'calc(249/390*100vw)',
            '@media screen and (min-width:913px)': {
              height: '440px',
            },
          }}
        ></Box>
        <Box
          sx={{
            marginTop: 'calc(128/750*100vw)',
            paddingBottom: 'calc(80/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginTop: '64px',
              paddingBottom: '40px',
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 'calc(32/750*100vw)',
              fontWeight: 'bold',
              '@media screen and (min-width:913px)': {
                fontSize: '16px',
              },
            }}
          >
            診断一覧
          </Typography>
          <Box
            sx={{
              marginTop: 'calc(64/750*100vw)',
              '@media screen and (min-width:913px)': {
                marginTop: '32px',
              },
            }}
          >
            {props.themes.map((theme, index) => (
              <Box
                sx={{
                  marginTop: 'calc(32/750*100vw)',
                  '&:first-of-type': { marginTop: 0 },
                  cursor: 'pointer',
                  '@media screen and (min-width:913px)': {
                    marginTop: '16px',
                  },
                }}
                key={index}
              >
                <NeurmophicBox key={index} paddingVertical={26}>
                  <Box
                    key={index}
                    alignItems="flex-start"
                    onClick={() => {
                      router.push('/themes/' + theme.label);
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 'calc(40/750*100vw)',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '@media screen and (min-width:913px)': {
                          fontSize: '20px',
                        },
                      }}
                    >
                      {theme.title}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: 'calc(24/750*100vw)',
                        fontSize: 'calc(24/750*100vw)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '@media screen and (min-width:913px)': {
                          marginTop: '12px',
                          fontSize: '12px',
                        },
                      }}
                    >
                      {theme.description ? theme.description : '-'}
                    </Typography>
                  </Box>
                </NeurmophicBox>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ThemeList;
