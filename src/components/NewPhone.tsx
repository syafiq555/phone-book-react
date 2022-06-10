import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PhoneI } from '../interfaces';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

interface PropsI {
  selectedPhone?: PhoneI | null;
  addPhone?: (params: PhoneI) => void;
  editPhone?: (params: PhoneI) => void;
  setOpen: (value: React.SetStateAction<string | boolean | null>) => void;
}

const NewPhone: React.FC<PropsI> = ({
  addPhone,
  setOpen,
  selectedPhone,
  editPhone,
}) => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name') as string,
      number: data.get('number') as string,
    } as PhoneI;

    if (!formData.name || !formData.number) {
      if (setOpen) {
        setOpen('Please fill in all details');
        return;
      }
    }

    if (addPhone) {
      addPhone(formData);
      navigate('/');
    }

    if (editPhone) {
      editPhone(formData);
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            New Phone Number
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              defaultValue={selectedPhone?.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number"
              label="Number"
              type="text"
              id="number"
              autoComplete="phone"
              defaultValue={selectedPhone?.number}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NewPhone;
