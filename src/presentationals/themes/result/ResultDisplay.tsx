import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme } from '@/datas/diagnose';
import NeurmophicBox from '@/components/NeurmophicBox';
import NeurmophicButton from '@/components/NeurmophicButton';
import * as gtag from '@/lib/gtag';

type ResultProps = {
  themeDetail: Theme;
  themes: Theme[];
};

const countTweetText = (title: string, result: string) => {
  let half_character_total = 0;
  let full_character_total = 0;

  for (let charaCount = 0; charaCount < result?.length; charaCount++) {
    let character = result.charCodeAt(charaCount);

    // 半角・全角判定
    if (character >= 0x0 && character <= 0x7f) {
      half_character_total += 1;
    } else {
      full_character_total += 2;
    }

    const urlCount = 31;
    const hashtagCount = 24; // space + # + 診断 + AI診断
    const hashtagTextCount = title.length * 2 + hashtagCount;
    const otherTxtCount = urlCount + hashtagTextCount;
    if (half_character_total + full_character_total > 280 - otherTxtCount) {
      return String(charaCount);
    }
  }

  return 'ok';
};

const ResultDisplay = (props: ResultProps) => {
  const router = useRouter();
  const result = router.query.result as string;
  let postText = result;
  const postTextLen = countTweetText(props.themeDetail.title, result);

  if (postTextLen != 'ok') {
    postText = result.substr(0, Number(postTextLen)) + '..';
  }

  const inputName = router.query.name as string;
  const [copiedMsg, setCopiedMsg] = useState('');

  useEffect(() => {
    if (!result) {
      router.push('/');
    }
  }, []);

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        setCopiedMsg('診断結果のテキストをコピーしました！');
      },
      function (err) {}
    );
  };

  // 改行コードをbrに修正
  const resultText = result?.split('\n').map(
    (line, key) =>
      line && (
        <span key={key}>
          {line}
          <br />
        </span>
      )
  );

  return (
    <Box>
      <Box
        sx={{
          margin: 'calc(64/750*100vw) auto',
          padding: '0 calc(70/750*100vw)',
          '@media screen and (min-width:913px)': {
            margin: '32px auto',
            padding: '0 35px',
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            lineHeight: '2.1111111111',
            letterSpacing: '0.18em',
            fontSize: 'calc(32/750*100vw)',
            fontWeight: 'bold',
            '@media screen and (min-width:913px)': { fontSize: '16px' },
          }}
        >
          {props.themeDetail.title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 'calc(48/750*100vw)',
          '@media screen and (min-width:913px)': { marginTop: '24px' },
        }}
      >
        <NeurmophicBox paddingVertical={40} paddingHorizontal={24}>
          <Typography
            sx={{
              textAlign: 'center',
              letterSpacing: '0.16em',
              fontSize: 'calc(60/750*100vw)',
              fontWeight: 'bold',
              '@media screen and (min-width:913px)': { fontSize: '30px' },
            }}
          >
            {inputName}の診断結果
          </Typography>
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
        </NeurmophicBox>
      </Box>
      <Box
        sx={{
          marginTop: 'calc(208/750*100vw)',
          '@media screen and (min-width:913px)': { marginTop: '104px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            letterSpacing: '0.18em',
            fontSize: 'calc(48/750*100vw)',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #F27400 9.11%, #F20000 100.2%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            '@media screen and (min-width:913px)': { fontSize: '24px' },
          }}
        >
          ★＼リリース記念／★
        </Typography>
        <Typography
          sx={{
            marginTop: 'calc(48/750*100vw)',
            textAlign: 'center',
            lineHeight: 2.2,
            letterSpacing: '0.1em',
            fontSize: 'calc(36/750*100vw)',
            fontWeight: 'bold',
            '@media screen and (min-width:913px)': {
              marginTop: '24px',
              fontSize: '18px',
            },
          }}
        >
          シェアで10人に1人に
          <br />
          Amazonギフト券（500円分）
          <br />
          当選キャンペーン中！！！
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 'calc(208/750*100vw)',
          '@media screen and (min-width:913px)': { marginTop: '104px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: 'calc(32/750*100vw)',
            fontWeight: 'bold',
            '@media screen and (min-width:913px)': { fontSize: '16px' },
          }}
        >
          みんなにシェア！
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'calc(64/750*100vw)',
            '@media screen and (min-width:913px)': { marginTop: '32px' },
          }}
        >
          <NeurmophicButton
            text={'結果をツイート'}
            func={() => {
              {
                /* コンバージョンGA送信 */
              }
              gtag.event({
                action: 'ShareToTwitter',
                category: 'AiDiagnose',
                label: props.themeDetail.title,
              });
              router.push(
                `http://twitter.com/share?text=${postText}&hashtags=${props.themeDetail.title},AIおもしろ診断,診断,AI診断&url=https://ai診断.com/themes/${props.themeDetail.label}`
              );
            }}
            color={'#1da1f2'}
            iconPath={'/icon-twitter.png'}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'calc(40/750*100vw) auto 0',
            '@media screen and (min-width:913px)': { margin: '20px auto 0' },
          }}
        >
          <NeurmophicButton
            text={'LINEでシェア'}
            func={() => {
              {
                /* コンバージョンGA送信 */
              }
              gtag.event({
                action: 'ShareToLINE',
                category: 'AiDiagnose',
                label: props.themeDetail.title,
              });
              router.push(
                `https://social-plugins.line.me/lineit/share?url=https://ai診断.com/themes/${props.themeDetail.label}&text=${postText}`
              );
            }}
            color={'#00b900'}
            iconPath={'/icon-line.png'}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'calc(40/750*100vw) auto 0',
            '@media screen and (min-width:913px)': { margin: '20px auto 0' },
          }}
        >
          <NeurmophicButton
            text={'結果をコピー'}
            func={() => copyTextToClipboard(`「${props.themeDetail.title}」の診断結果: ${result}`)}
            color={'#000'}
            iconPath={'/icon-copy.png'}
          />
        </Box>
        <Typography sx={{ marginTop: '16px', textAlign: 'center' }}>{copiedMsg}</Typography>
      </Box>
      <Box
        sx={{
          marginTop: 'calc(204/750*100vw)',
          '@media screen and (min-width:913px)': { marginTop: '104px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: 'calc(32/750*100vw)',
            fontWeight: 'bold',
            '@media screen and (min-width:913px)': { fontSize: '16px' },
          }}
        >
          他の結果を見たい？
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'calc(64/750*100vw) auto 0',
            '@media screen and (min-width:913px)': { margin: '32px auto 0' },
          }}
        >
          <NeurmophicButton
            text={'もう一度診断'}
            func={() => {
              router.push('/themes/' + props.themeDetail.label);
            }}
            color={'#000'}
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 'calc(208/750*100vw)',
          '@media screen and (min-width:913px)': { marginTop: '104px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: 'calc(32/750*100vw)',
            fontWeight: 'bold',
            '@media screen and (min-width:913px)': { fontSize: '16px' },
          }}
        >
          診断一覧
        </Typography>
        <Box
          sx={{
            marginTop: 'calc(64/750*100vw)',
            paddingBottom: 'calc(80/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginTop: '32px',
              paddingBottom: '40px',
            },
          }}
        >
          {props.themes.map((theme, index) => (
            <Box
              sx={{
                marginTop: 'calc(32/750*100vw)',
                '&:first-of-type': { marginTop: 0 },
                cursor: 'pointer',
                '@media screen and (min-width:913px)': { marginTop: '16px' },
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
  );
};

export default ResultDisplay;
