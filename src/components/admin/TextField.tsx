import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type TextInputProps = {
  control: Control<any>
  label: string
  name: string
  defaultValue?: string | number
  placeholder?: string
  multiline?: boolean
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

const CssTextArea = styled(TextareaAutosize)({
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

const inputPropsStyle = (multiline: boolean) => {
  return {
    pc: {
      height: multiline ? '100px' : '41px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    sp: {
      height: multiline ?  'calc(240/750 *100vw)' : 'calc(82/750 *100vw)',
      fontSize: 'calc(38/750*100vw)',
      fontWeight: 'bold',
    }
  }
};

const NeurmophicTextField = ({ control, label, name, defaultValue = '', placeholder = '', multiline = false }: TextInputProps) => {
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
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <CssTextField
              {...field}
              fullWidth
              margin="normal"
              type="text"
              multiline={multiline}
              rows={multiline ? 1 : 10}
              placeholder={placeholder}
              inputProps={{
                maxLength: 1000,
                style: matches ? inputPropsStyle(multiline).pc : inputPropsStyle(multiline).sp,
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default NeurmophicTextField;
