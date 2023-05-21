import React from 'react';
import { VFC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const NeurmophicButton: VFC<{
  text: string;
  func: any;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  iconPath?: string;
  size?: 'default' | 'small'
}> = ({ text, func, type, color, iconPath, size = 'default' }) => {
  const CssButton = styled(Button)({
    '&:active': {
      color: '#fff',
      background: color,
    },
    '	.MuiButton-startIcon': {
      display: iconPath ? 'block' : 'none',
    },
  });

  return (
    <CssButton
      type={type}
      sx={{
        width: '100%',
        height: size === 'small' ? '48px' :  'calc(144/750*100vw)',
        color: '#513FBF',
        lineHeight: 'calc(38/750*100vw)',
        fontSize:  size === 'small' ? '16px' : 'calc(48/750*100vw)',
        fontWeight: 'bold',
        letterSpacing: '0.18em',
        boxShadow:
          '-2.17893px -2.17893px 6.5368px #FFFFFF, 2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4)',
        background: color ? color : 'linear-gradient(90deg, #F27400 9.11%, #F20000 100.2%)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        borderRadius: 'calc(100/750*100vw)',
        '@media screen and (min-width:913px)': {
          maxWidth: '400px',
          height: size === 'small' ? '56px' : '72px',
          lineHeight: '19px',
          fontSize: size === 'small' ? '16px' : '24px',
          borderRadius: '50px',
        },
      }}
      startIcon={
        <Box
          sx={{
            marginRight: 'calc(32/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginRight: '16px',
            },
            '& img': {
              width: 'calc(80/750*100vw)',
              height: 'calc(80/750*100vw)',
              '@media screen and (min-width:913px)': {
                width: '40px',
                height: '40px',
              },
            },
          }}
        >
          <img src={iconPath} alt="" />
        </Box>
      }
      onClick={func}
    >
      {text}
    </CssButton>
  );
};

export default NeurmophicButton;
