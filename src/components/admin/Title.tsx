import Typography from '@mui/material/Typography';

interface Props {
  text: string
}

export const Title = ({ text }: Props) => (
  <Typography
    variant="h1"
    sx={{
      lineHeight: '1.7142857143',
      letterSpacing: '0.18em',
      fontSize: 'calc(56/750*100vw)',
      fontWeight: 'bold',
      '@media screen and (min-width:913px)': { fontSize: '28px' },
    }}
  >
    {text}
  </Typography>
)

