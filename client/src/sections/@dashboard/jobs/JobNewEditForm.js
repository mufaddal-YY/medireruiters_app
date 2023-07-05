import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';

// next
import { useRouter } from 'next/router';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import axios from 'axios';

// ----------------------------------------------------------------------

const statusess = ['Active', 'Inactive'];

JobNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentJob: PropTypes.object,
};

export default function JobNewEditForm({ isEdit = false, currentJob, initialStatuses }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewJobSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job title is required'),
    qualification: Yup.string().required('Qualification is required'),
    experience: Yup.string().required('Experience is required'),
    equipment: Yup.string().required('Equipments Status is required'),
    opd: Yup.string().required('OPD info is required'),
    occupancy: Yup.string().required('Occupancy Status is required'),
    salary: Yup.string().required('Salary is required'),
    holidays: Yup.string().required('Holidays is required'),
    conference: Yup.string().required('Conference Leaves is required'),
    accommodation: Yup.string().required('Accommodation info is required'),
    lang: Yup.string().required('Language is a must'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      jobTitle: currentJob?.jobTitle || '',
      qualification: currentJob?.qualification || '',
      experience: currentJob?.experience || '',
      equipment: currentJob?.equipment || '',
      opd: currentJob?.opd || '',
      occupancy: currentJob?.occupancy || '',
      salary: currentJob?.salary || '',
      holidays: currentJob?.holidays || '',
      conference: currentJob?.conference || '',
      accommodation: currentJob?.accommodation || '',
      lang: currentJob?.lang || '',
      status: currentJob?.status || 'Active',
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentJob) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentJob]);

  const onSubmit = async (data) => {
    try {
      let response;
      let successMessage;

      if (isEdit) {
        response = await axios.put(`http://localhost:8080/api/v1/jobs/${currentJob._id}`, data);
        successMessage = 'Updated Successfully';
      } else {
        response = await axios.post('http://localhost:8080/api/v1/jobs', data);
        successMessage = 'Created Successfully';
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(successMessage, { variant: 'success' }); // Show success snackbar
      push(PATH_DASHBOARD.general.jobs);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred', { variant: 'error' }); // Show error snackbar
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Stack spacing={2}>
            <Stack spacing={2} direction={{ md: 'row', sm: 'column' }}>
              <Stack spacing={1} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Job Title
                </Typography>
                <RHFTextField name="jobTitle" />
              </Stack>

              <Stack
                spacing={1}
                mb={3}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Qualification
                </Typography>
                <RHFTextField fullWidth name="qualification" />
              </Stack>
            </Stack>

            <Stack spacing={2} direction={{ md: 'row', sm: 'column' }}>
              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Experience
                </Typography>
                <RHFTextField fullWidth name="experience" />
              </Stack>

              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Equipment
                </Typography>
                <RHFTextField fullWidth name="equipment" />
              </Stack>
            </Stack>

            <Stack spacing={2} direction={{ md: 'row', sm: 'column' }}>
              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  OPD of Dept.
                </Typography>
                <RHFTextField fullWidth name="opd" />
              </Stack>

              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  % Occupancy
                </Typography>
                <RHFTextField fullWidth name="occupancy" />
              </Stack>

              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Salary
                </Typography>
                <RHFTextField fullWidth name="salary" />
              </Stack>
            </Stack>

            <Stack spacing={2} direction={{ md: 'row', sm: 'column' }}>
              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Annual Holidays
                </Typography>
                <RHFTextField fullWidth name="holidays" />
              </Stack>

              <Stack
                spacing={1}
                mb={1}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Conference Leaves
                </Typography>
                <RHFTextField fullWidth name="conference" />
              </Stack>
            </Stack>

            <Stack spacing={2} direction={{ md: 'row', sm: 'column' }}>
              <Stack
                spacing={1}
                mb={2}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Accomodation
                </Typography>
                <RHFTextField fullWidth name="accommodation" />
              </Stack>

              <Stack
                spacing={1}
                mb={2}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Language
                </Typography>
                <RHFTextField fullWidth name="lang" />
              </Stack>
              <Stack
                spacing={1}
                mb={2}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Job Status
                </Typography>
                <RHFSelect native name="status" placeholder="Status">
                  {statusess.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Stack>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Post Job' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
