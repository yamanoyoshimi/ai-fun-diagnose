import React from 'react';
import { Box, Link } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        padding: 'calc(48/750*100vw) calc(48/750*100vw) 0',
        '@media screen and (min-width:913px)': {
          padding: '24px 24px 0',
        },
      }}
    >
      <Link
        sx={{
          '& img': {
            width: 'calc(346/750*100vw)',
            height: 'calc(74/750*100vw)',
            '@media screen and (min-width:913px)': {
              width: '173px',
              height: '37px',
            },
          },
        }}
        href="/"
      >
        <img src={'/ai-diagnose-header-logo.png'} alt="AIおもしろ診断" />
      </Link>
    </Box>
  );
};

export default Header;
