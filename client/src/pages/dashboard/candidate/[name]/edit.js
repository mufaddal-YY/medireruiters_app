import { paramCase } from 'change-case';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import UserNewEditForm from '../../../../sections/@dashboard/user/UserNewEditForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

UserEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const {
    query: { name },
  } = useRouter();

  const [candidates, setCandidate] = useState([]);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  const getCandidates = async () => {
    try {
      const response = await axios.get('https://medi-server.onrender.com/api/v1/candidates');
      console.log('API response:', response.data);
      setCandidates(response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      const foundCandidate = candidates.find((candidate) => paramCase(candidate.name) === name);
      setCurrentCandidate(foundCandidate);
    }
  }, [candidates, name]);

  return (
    <>
      <Head>
        <title>Candidate: Edit candidate | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Edit Candidate"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Candidate',
              href: PATH_DASHBOARD.general.database,
            },
            { name: currentCandidate?.name },
          ]}
        />

        <UserNewEditForm isEdit currentCandidate={currentCandidate} />
      </Container>
    </>
  );
}
