import React, { VFC, ReactNode } from 'react';
import { themePalette } from '@/styles/commonTheme';
import Box from '@mui/material/Box';

const NeurmophicBox: VFC<{
  children: ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
}> = ({ children, paddingVertical = 24, paddingHorizontal = 24 }) => {
  return (
    <Box
      sx={{
        padding: `calc(${paddingVertical * 2}/750*100vw) calc(${paddingHorizontal * 2}/750*100vw)`,
        background: themePalette.palette.background.default,
        boxShadow:
          '-2.17893px -2.17893px 6.5368px #FFFFFF, 2.17893px 2.17893px 6.5368px rgba(174, 174, 192, 0.4)',
        borderRadius: '4px',
        '@media screen and (min-width:913px)': {
          padding: `${paddingVertical}px ${paddingHorizontal}px`,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default NeurmophicBox;
