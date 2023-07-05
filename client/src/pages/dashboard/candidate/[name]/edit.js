import { paramCase } from 'change-case';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { _userList } from '../../../../_mock/arrays';
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
      const response = await axios.get('http://localhost:8080/api/v1/candidates');
      console.log('API response:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (candidate.length > 0) {
      const foundCandidate = candidates.find((candidates) => paramCase(candidate.name) === name);
      setCurrentCandidate(foundCandidate);
    }
  }, [users, name]);

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
            { name: currentUser?.name },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
