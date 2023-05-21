import type { NextPage } from 'next'
import { useState } from 'react'

import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout'
import { getListThemes, Theme } from '@/datas/diagnose'
import Typography from '@mui/material/Typography'
import NeurmophicBox from '@/components/NeurmophicBox'
import Box from '@mui/material/Box'
import NeurmophicButton from '@/components/NeurmophicButton'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import DustBox from '@mui/icons-material/Delete'
import Modal from '@mui/material/Modal'
import axios from 'axios'

interface Props {
  themes: Theme[]
}

const Setting: NextPage<Props> = function ({ themes }) {
  const router = useRouter()

  const [ showModal, setShowModal ] = useState(false)
  const [ target, setTarget ] = useState(null)
  const handleModalClose = () => { 
    setShowModal(false)
    setTarget(null)
  }

  const handleModalOpen = (label: string) => { 
    setShowModal(true)
    setTarget(label)
  }

  const deleteTheme = async () => {
    const label = target
    setTarget(null)
    setShowModal(false)    
    await axios.delete('/api/diagnose/', { data: { label } })
    location.reload()
  }

  const getTheme = (labelName: string): Theme => {
    const theme = themes.find((diagnose) => diagnose.label === labelName);
    if (!theme) return null;
    return {
      label: theme.label,
      title: theme.title,
      description: theme.description,
      createdDate: theme.createdDate,
      count: 100,
    };
  };


  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '@media screen and (min-width:913px)': { width: 600 },
  }

  return (
    <SeparatedLayout>
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
            marginTop: 'calc(128/750*100vw)',
            paddingBottom: 'calc(80/750*100vw)',
            '@media screen and (min-width:913px)': {
              marginTop: '64px',
              paddingBottom: '40px',
            },
          }}
        >
          <Box sx={{
            justifyContent: 'space-between',
            display: 'flex'}}>
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
            <NeurmophicButton text={'お題を追加する'} func={() => {
              router.push('/admin/add')
            }} size={'small'} />
          </Box>
          <Box
            sx={{
              marginTop: 'calc(64/750*100vw)',
              '@media screen and (min-width:913px)': {
                marginTop: '32px',
              },
            }}
          >
            {themes.map(({ label, title, description }, index) => (
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
                      router.push('/admin/edit/' + label);
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
                      {title}
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
                      {description || '-'}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() =>{
                      handleModalOpen(label)
                    }}
                  >
                    <DustBox />
                  </IconButton>
                </NeurmophicBox>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Modal
      open={showModal}
      onClose={handleModalClose}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{
            fontWeight: 'bold'
          }}>
            以下のプロンプトを削除します。
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {target && getTheme(target).title}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {target && getTheme(target).description}
          </Typography>
          <Box sx={{
            display: 'flex',
            marginTop: '8px'
          }}>
            <NeurmophicButton
              text={'削除する'}
              func={deleteTheme}
              size={'small'}
              color={'#FF0000'}
            />
            <NeurmophicButton
              text={'キャンセル'}
              func={handleModalClose}
              size={'small'}
              color={'#888888'}
            />
          </Box>
        </Box>
      </Modal>      
    </SeparatedLayout>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      themes: await getListThemes()
    },
  };
};



export default Setting;
