import React from 'react';
import { Box } from '@mui/material';
import Header from '@/presentationals/_partials/Header';
import Footer from '@/presentationals/_partials/Footer';

const SeparatedLayout: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          paddingRight: 'calc(48/750*100vw)',
          paddingLeft: 'calc(48/750*100vw)',
          '@media screen and (min-width:913px)': {
            paddingRight: '24px',
            paddingLeft: '24px',
          },
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default SeparatedLayout;
