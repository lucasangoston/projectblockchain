import { Grid } from '@mui/material';
import * as React from 'react';
import { LoginImage } from '../../components/login/loginImage';
import { FormLogin } from '../../components/login/form/formLogin';

export default function LoginLens() {
  return (
    <div>
      <Grid container direction="row">
        <Grid item md={6}>
          <FormLogin></FormLogin>
        </Grid>
        <Grid item md={6}>
          <LoginImage></LoginImage>  
        </Grid>
      </Grid>
    </div>
  );
}
