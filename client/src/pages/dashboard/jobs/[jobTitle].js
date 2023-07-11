import { paramCase } from 'change-case';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Grid, Button, Stack, Tab, Tabs, Box, Card, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import AppliedCandidates from 'src/sections/@dashboard/jobs/AppliedCandidates';

JobDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function JobDetailPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { jobTitle },
  } = useRouter();

  const [jobs, setJobs] = useState([]);

  const [currentJob, setCurrentJob] = useState(null);

  const getJobs = async () => {
    try {
      const response = await axios.get('https://medi-server.onrender.com/api/v1/jobs');
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

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={currentJob?.jobTitle}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Candidate',
              href: PATH_DASHBOARD.general.jobs,
            },
            { name: currentJob?.jobTitle },
          ]}
        />

        <Card spacing={3} sx={{ p: 3, mb: 3 }}>
          <Stack direction={'row'} spacing={2}>
            <Stack>
              <Label
                variant="soft"
                color={(currentJob?.status === 'Inactive' && 'error') || 'success'}
                sx={{ textTransform: 'capitalize', mb: 3 }}
              >
                {currentJob?.status}
              </Label>
            </Stack>
            <Stack>
              <Label variant="soft" color="info" sx={{ textTransform: 'capitalize', mb: 3 }}>
                {currentJob?.lang}
              </Label>
            </Stack>
          </Stack>

          <Stack direction={'row'} spacing={3}>
            <Stack
              sx={{ flexGrow: 2, justifyContent: 'space-between' }}
              direction={'column'}
              spacing={3}
            >
              <Stack>
                <Typography variant="h6">Qualification</Typography>
                <Typography variant="paragraph">{currentJob?.qualification}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6">OPD</Typography>
                <Typography variant="paragraph">{currentJob?.opd}</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{ flexGrow: 2, justifyContent: 'space-between' }}
              direction={'column'}
              spacing={3}
            >
              <Stack>
                <Typography variant="h6">Experience</Typography>
                <Typography variant="paragraph">{currentJob?.experience}</Typography>
              </Stack>

              <Stack>
                <Typography variant="h6">% Occupancy</Typography>
                <Typography variant="paragraph">{currentJob?.occupancy}</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{ flexGrow: 2, justifyContent: 'space-between' }}
              direction={'column'}
              spacing={3}
            >
              <Stack>
                <Typography variant="h6">Salary</Typography>
                <Typography variant="paragraph">{currentJob?.salary}</Typography>
              </Stack>

              <Stack>
                <Typography variant="h6">Holidays</Typography>
                <Typography variant="paragraph">{currentJob?.holidays}</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{ flexGrow: 2, justifyContent: 'space-between' }}
              direction={'column'}
              spacing={3}
            >
              <Stack>
                <Typography variant="h6">Conference Leaves</Typography>
                <Typography variant="paragraph">{currentJob?.conference}</Typography>
              </Stack>

              <Stack>
                <Typography variant="h6">Accomodation</Typography>
                <Typography variant="paragraph">{currentJob?.accommodation}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        
      </Container><AppliedCandidates />
    </>
  );
}
