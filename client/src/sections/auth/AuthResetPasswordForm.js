import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import FormProvider, { RHFTextField } from '../../components/hook-form';

export default function AuthResetPasswordForm() {
  const auth = getAuth();
  const { push } = useRouter();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email } = data;

    try {
      await sendPasswordResetEmail(auth, email);

      // Password reset email sent successfully
      push('/'); // Replace with the desired page to redirect after the password reset email is sent
    } catch (error) {
      // Handle error
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
