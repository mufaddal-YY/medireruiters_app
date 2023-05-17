// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import JobsNewEditForm from '../../../sections/@dashboard/jobs/JobNewEditForm';

// ----------------------------------------------------------------------

NewJob.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function NewJob() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Job: Create a New Job | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xxl'}>
        <CustomBreadcrumbs
          heading="Create a new Job"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Jobs',
              href: PATH_DASHBOARD.candidate.list,
            },
            { name: 'New Job' },
          ]}
        />
        <JobsNewEditForm />
      </Container>
    </>
  );
}
