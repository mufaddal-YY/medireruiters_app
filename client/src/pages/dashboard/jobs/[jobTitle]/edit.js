import { paramCase } from 'change-case';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Grid, Stack } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import JobNewEditForm from '../../../../sections/@dashboard/jobs/JobNewEditForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

JobEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
const statusess = ['Active', 'Inactive'];

export default function JobEditPage({ params }) {

  const { themeStretch } = useSettingsContext();
 
  const {
    query: { jobTitle },
  } = useRouter();

  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status

  const getJobs = async () => {
    try {
      const response = await axios.get(`https://medi-server.onrender.com/api/v1/jobs/${params._id}`);
      console.log('API response:', response.data);
      setJobs(response.data); // Assuming you have a state variable named "jobs" to store the response data
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find((job) => paramCase(job.jobTitle) === jobTitle);
      setCurrentJob(foundJob); // Assuming you have a state variable named "currentJob" to store the found job
    }
  }, [jobs, jobTitle]);

  return (
    <>
      <Head>
        <title>Jobs: Edit job | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack>
            <CustomBreadcrumbs
              heading="Edit Job"
              links={[
                {
                  name: 'Dashboard',
                  href: PATH_DASHBOARD.root,
                },
                {
                  name: 'Candidate',
                  href: PATH_DASHBOARD.general.jobs,
                },
                { jobTitle: currentJob?.jobTitle },
              ]}
            />
          </Stack>
        </Stack>

        <Grid item xs={12}>
          <JobNewEditForm isEdit currentJob={currentJob} />
        </Grid>
      </Container>
    </>
  );
}
