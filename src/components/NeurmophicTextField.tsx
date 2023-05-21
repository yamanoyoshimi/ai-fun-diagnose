import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type TextInputProps = {
  control: Control;
  label: string;
};

const CssTextField = styled(TextField)({
  '& label': {
    fontWeight: 'bold',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      borderRadius: '16px',
      boxShadow:
        'inset -4px -4px 12px rgba(253, 255, 255, 0.8), inset 4px 4px 12px rgba(187, 195, 206, 0.6)',
    },
    '&:hover fieldset': {
      border: 'none',
      borderRadius: '16px',
      boxShadow:
        'inset -4px -4px 12px rgba(253, 255, 255, 0.8), inset 4px 4px 12px rgba(187, 195, 206, 0.6)',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
      borderRadius: '16px',
      boxShadow:
        'inset -4px -4px 12px rgba(253, 255, 255, 0.8), inset 4px 4px 12px rgba(187, 195, 206, 0.6)',
    },
  },
});

const inputPropsStyle = {
  pc: {
    height: '41px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  sp: {
    height: 'calc(82/750*100vw)',
    fontSize: 'calc(38/750*100vw)',
    fontWeight: 'bold',
  },
};

const NeurmophicTextField = (props: TextInputProps) => {
  const { control, label } = props;
  const matches: boolean = useMediaQuery('(min-width:913px)');

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 'calc(40/750*100vw)',
          fontWeight: 'bold',
          '@media screen and (min-width:913px)': {
            fontSize: '20px',
          },
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          marginTop: 'calc(16/750*100vw)',
          '@media screen and (min-width:913px)': {
            marginTop: '8px',
          },
        }}
      >
        <Controller
          control={control}
          name="name"
          defaultValue={''}
          render={({ field }) => (
            <CssTextField
              {...field}
              fullWidth
              margin="normal"
              type="text"
              placeholder="名前"
              inputProps={{
                maxLength: 15,
                style: matches ? inputPropsStyle.pc : inputPropsStyle.sp,
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default NeurmophicTextField;
