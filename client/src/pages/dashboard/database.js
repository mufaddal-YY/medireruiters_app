import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState, useMemo, useCallback, useEffect } from 'react';

// next
import Head from 'next/head';
import { useRouter } from 'next/router';

// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  TableCell,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Box,
  Grid,
  Stack,
} from '@mui/material';
import { useSnackbar } from '../../components/snackbar';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// layouts
import DashboardLayout from '../../layouts/dashboard';

// components
import { useForm } from 'react-hook-form';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
import FormProvider, { RHFTextField } from '../../components/hook-form';

import { FileNewFolderDialog } from '../../sections/@dashboard/file';
// sections
import { DatabaseTableToolbar, DatabaseTableRow } from '../../sections/@dashboard/database/list';
import { label } from 'yet-another-react-lightbox/core';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { _userList } from '../../_mock/arrays';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'blacklisted'];

// const ROLE_OPTIONS = [
//   'all',
//   'ux designer',
//   'full stack designer',
//   'backend developer',
//   'project manager',
//   'leader',
//   'ui designer',
//   'ui/ux designer',
//   'front end developer',
//   'full stack developer',
// ];

const TABLE_HEAD = [
  { id: 'name', label: 'Company Name', align: 'left' },
  { id: 'hrName', label: 'HR Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone', label: 'Phone Number', align: 'left' },
  { id: 'requirement', label: 'Requirement', align: 'left' },
  { id: 'location', label: 'location', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

DatabasePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DatabasePage({ isEdit = false, currentDatabase, initialStatuses }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewDatabaseSchema = Yup.object().shape({
    companyName: Yup.string().required('Hospital/Company Name is required'),
    hrName: Yup.string().required('HR name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email Status is required'),
    location: Yup.string().required('Location is required'),
    requirement: Yup.string().required('Requirement is required'),
  });

  const defaultValues = useMemo(
    () => ({
      companyName: currentDatabase?.companyName || '',
      hrName: currentDatabase?.hrName || '',
      phone: currentDatabase?.phone || '',
      email: currentDatabase?.email || '',
      requirement: currentDatabase?.requirement || '',
      location: currentDatabase?.location || '',
    }),
    [currentDatabase]
  );

  const methods = useForm({
    resolver: yupResolver(NewDatabaseSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const FILE_TYPE_OPTIONS = ['excel'];

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const getTableData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/databases');
      console.log('API response:', response.data);
      setTableData(response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  }, []);

  useEffect(() => {
    getTableData();
  }, []);

  const ROLE_OPTIONS = ['all', ...new Set(tableData.map((database) => database.requirement))];

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      let response;
      let successMessage;

      if (isEdit) {
        response = await axios.put(
          `http://localhost:8080/api/v1/databases/${currentDatabase._id}`,
          data
        );
        successMessage = 'Updated Successfully';
      } else {
        response = await axios.post('http://localhost:8080/api/v1/databases', data);
        successMessage = 'Created Successfully';
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(successMessage, { variant: 'success' }); // Show success snackbar
      push(PATH_DASHBOARD.general.database);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred', { variant: 'error' }); // Show error snackbar
    }
  };

  const handleDeleteRow = async (_id) => {
    try {
      const deleteRow = tableData.filter((row) => row._id !== _id);
      setSelected([]);
      setTableData(deleteRow);

      if (page > 0) {
        if (dataInPage.length < 2) {
          setPage(page - 1);
        }
      }

      await axios.delete(`http://localhost:8080/api/v1/databases/${_id}`);

      // Show success snackbar
      enqueueSnackbar('Deleted', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting row:', error);
      // Handle error or show an error notification
      enqueueSnackbar('Error deleting user', { variant: 'error' });
    }
  };

  const handleDeleteRows = async (selectedRows) => {
    try {
      const deleteRows = tableData.filter((row) => !selectedRows.includes(row._id));
      setSelected([]);
      setTableData(deleteRows);

      if (page > 0) {
        if (selectedRows.length === dataInPage.length) {
          setPage(page - 1);
        } else if (selectedRows.length === dataFiltered.length) {
          setPage(0);
        } else if (selectedRows.length > dataInPage.length) {
          const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
          setPage(newPage);
        }
      }

      // Delete each selected row from the database
      for (const rowId of selectedRows) {
        await axios.delete(`http://localhost:8080/api/v1/databases/${rowId}`);
      }

      // Handle success or show a notification
      enqueueSnackbar('Deleted', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting', { variant: 'error' });
      // Handle error or show an error notification
    }
  };

  const handleEditRow = (_id) => {
    push(PATH_DASHBOARD.database.edit(paramCase(_id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  return (
    <>
      <Head>
        <title> Database | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xxl'}>
        <CustomBreadcrumbs
          heading="Client Database"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Database', href: PATH_DASHBOARD.general.database },
          ]}
          action={<></>}
        />

        <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ mb: 2 }} item xs={12} md={8}>
            <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
              <Stack direction="column" spacing={1.5} sx={{ flexGrow: 1 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <RHFTextField
                    fullWidth
                    name="companyName"
                    label="Company Name"
                    variant="outlined"
                  />
                  <RHFTextField fullWidth name="hrName" label="HR Name" variant="outlined" />
                  <RHFTextField fullWidth name="email" label="Email" variant="outlined" />
                </Stack>
                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
                  <RHFTextField fullWidth name="phone" label="Phone" variant="outlined" />
                  <RHFTextField
                    fullWidth
                    name="requirement"
                    label="Requirement"
                    variant="outlined"
                  />
                  <RHFTextField fullWidth name="location" label="Location" variant="outlined" />
                </Stack>
              </Stack>
              <Stack spacing={2.5} direction="column">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Client
                </Button>
                <Button
                  variant="soft"
                  size="large"
                  startIcon={<Iconify icon="material-symbols:upload-rounded" />}
                  onClick={handleOpenUploadFile}
                >
                  Upload
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </FormProvider>

        <Card>
          {/* <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs> */}

          <Divider />

          <DatabaseTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <DatabaseTableRow
                        key={row._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row.companyName)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (database) => database.companyName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((database) => database.requirement === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((database) => database.requirement === filterRole);
  }

  return inputData;
}
