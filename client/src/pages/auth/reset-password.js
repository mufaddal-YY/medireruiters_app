// next
import Head from 'next/head';
import NextLink from 'next/link';

// @mui
import { Typography, Stack, Link, } from '@mui/material';

// routes
import { PATH_AUTH } from '../../routes/paths';
import LoginLayout from '../../layouts/login';

// components
import Iconify from '../../components/iconify';
// sections
import AuthResetPasswordForm from '../../sections/auth/AuthResetPasswordForm';
// assets
import { PasswordIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title> Reset Password | Medirecruiters</title>
      </Head>

      <LoginLayout title="Manage the job more effectively with Minimal">
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <PasswordIcon sx={{ mb: 5, height: 96 }} />

          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Please enter the email address associated with your account and We will email you a link
            to reset your password.
          </Typography>
        </Stack>

        <AuthResetPasswordForm />

        <Stack  spacing={1} m={2} sx={{ position: 'relative', alignItems: 'center' }}>
        <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
      </Stack>

        
      </LoginLayout>
    </>
  );
}
