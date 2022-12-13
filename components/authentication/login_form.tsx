import { PrimarySearchAppBar } from '../navigationBar/navigationBar';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

interface Values {
  username: string;
  password: string;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function LoginForm() {
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-6 font-bold">Login 🌿</h1>
        <Box
          component="form"
          noValidate
          sx={{
            display: 'grid',
            gap: 2,
          }}
          style={{ marginTop: 100 }}
        >
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Username
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Password
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input" />
          </FormControl>

          <Button
            onClick={() => {
              alert('clicked');
            }}
            variant="outlined"
          >
            Login
          </Button>
        </Box>
      </div>
    </div>
  );
}

/*
<div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-6 font-bold'>Login 🌿</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>

            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
*/
