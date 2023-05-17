// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Card, Box, InputAdornment } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppCandidates,
} from '../../sections/@dashboard/general/app';

import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';

import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../../_mock/arrays';

// assets
import Iconify from '../../components/iconify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CustomTextField } from 'src/components/custom-input';
// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'Location', label: 'Location', align: 'left' },
  { id: '' },
];


export default function GeneralAppPage({ searchJobs, onSearchJobs }) {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const handleDownloadPdf = () => {
    // Get the HTML content of the entire page
    const htmlContent = document.documentElement;

    // Use html2canvas to convert the HTML content to an image
    html2canvas(htmlContent).then((canvas) => {
      // Use jsPDF to create a PDF document from the image
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF document to the user's device
      pdf.save('document.pdf');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: 'Check out this page!',
          url: url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      window.prompt('Copy this URL:', url);
    }
  };

  return (
    <>
      <Head>
        <title> Dashboard | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Stack flexDirection="row" justifyContent="flex-end" spacing={1} direction="row">
              <CustomTextField
                size="small"
                value={searchJobs}
                onChange={onSearchJobs}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* <Button sx={{fontWeight:"500"}}   size="medium" variant='soft' onClick={handleDownloadPdf}>
                  <Iconify sx={{pr: "2px"}} icon="eva:download-fill" />
                  Export
                </Button> */}

              <Button sx={{ fontWeight: '500' }} size="medium" variant="soft" onClick={handlePrint}>
                <Iconify sx={{ pr: '2px' }} icon="eva:printer-outline" />
                Print
              </Button>

              <Button sx={{ fontWeight: '500' }} size="medium" variant="soft" onClick={handleShare}>
                <Iconify sx={{ pr: '2px' }} icon="eva:share-fill" />
                Share
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Jobs Posted"
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Active Users"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Applications"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Placed Candidates "
              percent={10}
              total={68}
              chart={{
                colors: [theme.palette.success.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Placement Summary"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.secondary.main,
                ],
                series: [
                  { label: 'Cardiologist', value: 12244 },
                  { label: 'Nursing', value: 53345 },
                  { label: 'Physio', value: 44313 },
                  { label: 'Dentist', value: 78343 },
                  { label: 'Oncologist', value: 77343 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Monthly Stats"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Candidates', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                      { name: 'Placements', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Candidates', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Placements', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <AppCandidates
              title="Candidates"
              tableData={TABLE_HEAD}
              // tableLabels={[
              //   { id: 'booker', label: 'Name' },
              //   { id: 'checkIn', label: 'Date Applied' },
              //   { id: 'checkOut', label: 'Date Placed' },
              //   { id: 'status', label: 'Status' },
              //   { id: 'phone', label: 'Phone' },
              //   { id: 'roomType', label: 'Room Type' },
              //   { id: '' },
              // ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
