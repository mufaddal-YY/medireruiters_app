// next
import NextLink from 'next/link';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import Logo from 'src/components/logo/Logo';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 3, position: 'relative', alignItems: 'center' }}>
        <Logo />
        <Typography variant="body1"> <strong>Sign in</strong> to access your account</Typography>

        {/* <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      <AuthLoginForm />
      <Stack  spacing={1} m={2} sx={{ position: 'relative', alignItems: 'center' }}>
        <Typography variant="body2"> New User?</Typography>

        <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
