import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Iconify from '../../../components/iconify';

// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import axios from 'axios';
import bcrypt from 'bcryptjs';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCandidate: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentCandidate }) {
  
  const { push } = useRouter();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewCandidateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),

    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string()
      .required('City is required')
      .notOneOf([Yup.ref('address')], 'City should not be the same as address'),
    zipCode: Yup.string().required('Zip code is required'),
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCandidate?.name || '',
      email: currentCandidate?.email || '',
      phoneNumber: currentCandidate?.phoneNumber || '',
      address: currentCandidate?.address || '',
      country: currentCandidate?.country || '',
      state: currentCandidate?.state || '',
      city: currentCandidate?.city || '',
      zipCode: currentCandidate?.zipCode || '',
      username: currentCandidate?.userename || '',
      password: currentCandidate?.password || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCandidate]
  );

  const methods = useForm({
    resolver: yupResolver(NewCandidateSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCandidate) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCandidate]);

  // const onSubmit = async (data) => {
  //   try {
  //     const hashedPassword = await bcrypt.hash(data.password, 10); // Hash the password with a salt of 10 rounds
  //     const newData = {
  //       ...data,
  //       password: hashedPassword,
  //     };
  //     const response = await axios.post('http://localhost:8080/api/v1/users', newData);
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
  //     push(PATH_DASHBOARD.general.banking);
  //     console.log('DATA', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (data) => {
    
    try {

      const hashedPassword = await bcrypt.hash(data.password, 10);
     
      const newData = {
        ...data,
        password: hashedPassword,
      };

      let response;
      let successMessage;

      if (isEdit) {
        response = await axios.put(
          `http://localhost:8080/api/v1/candidates/${currentCandidate._id}`,
          newData
        );
        successMessage = 'Updated Successfully';
      } else {
        response = await axios.post('http://localhost:8080/api/v1/candidates', newData);
        successMessage = 'Created Successfully';
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(successMessage, { variant: 'success' }); // Show success snackbar
      push(PATH_DASHBOARD.general.candidates);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred', { variant: 'error' }); // Show error snackbar
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="phoneNumber" label="Phone Number" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="state" label="State/Region" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="zipCode" label="Zip/Code" />
            <RHFSelect native name="country" label="Country" placeholder="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
          </Box>

          {/* <Stack direction="column" spacing={3} sx={{ py: 6 }}>
            <Typography variant="h6">Create Credentials</Typography>
            <Stack direction="row" spacing={2}>

              <RHFTextField name="username" label="Username" />

              <RHFTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack> */}

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
