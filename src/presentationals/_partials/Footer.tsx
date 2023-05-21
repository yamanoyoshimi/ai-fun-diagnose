import React from 'react';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';

export const FOOTER_HEIGHT = '24px';
const FooterStyle = {
  Wrapper: {
    position: 'fixed',
    width: '100%',
    height: FOOTER_HEIGHT,
    bottom: 0,
    boxShadow: '0px 0px 4px rgba(0, 0, 0, .1)',
  },
  Inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0 calc(32/750*100vw)',
    height: '100%',
    background: '#F0F0F3',
    '@media screen and (min-width:913px)': {
      gap: '0 16px',
    },
  },
  LinkText: {
    fontSize: 'calc(20/750*100vw)',
    color: 'gray',
    textDecoration: 'none',
    '@media screen and (min-width:913px)': {
      fontSize: '10px',
    },
  },
};

const Footer = () => {
  return (
    <Box sx={FooterStyle.Wrapper}>
      <Box sx={FooterStyle.Inner}>
        <Link
          sx={FooterStyle.LinkText}
          href="https://sable-uncle-482.notion.site/4400a80a71f445ab9dff76b9cd856388"
          target="_blank"
        >
          利用規約
        </Link>
        <Link
          sx={FooterStyle.LinkText}
          href="https://www.notion.so/06f1607405e94dc3bfbc8151a1b4f33e"
          target="_blank"
        >
          プライバシーポリシー
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
