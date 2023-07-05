import { paramCase } from 'change-case';
import { useState, useCallback, useEffect } from 'react';

// next
import Head from 'next/head';
import { useRouter } from 'next/router';

// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Box,
  Stack,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// layouts
import DashboardLayout from '../../layouts/dashboard';

// components
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

import { FileNewFolderDialog } from '../../sections/@dashboard/file';

// sections
import { JobTableToolbar, JobTableRow } from '../../sections/@dashboard/jobs/list';

import { useSnackbar } from '../../components/snackbar';

import axios from 'axios';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'Active', 'Inactive'];

const TABLE_HEAD = [
  { id: 'jobTitle', label: 'Job Role', align: 'center' },
  { id: 'name', label: 'Salary', align: 'left' },
  { id: 'applications', label: 'Language', align: 'left' },
  { id: 'date', label: 'Created on', align: 'left' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserListPage() {
  const { enqueueSnackbar } = useSnackbar();

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

  const { themeStretch } = useSettingsContext();

  const { push } = useRouter();

  const [tableData, setTableData] = useState([]);

  const getTableData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/jobs');
      console.log('API response:', response.data);
      setTableData(response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  }, []);

  useEffect(() => {
    getTableData();
  }, []);

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

  const isFiltered = filterName !== '' || filterStatus !== 'all';

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

      await axios.delete(`http://localhost:8080/api/v1/jobs/${_id}`);

      // Show success snackbar
      enqueueSnackbar('Job Deleted', { variant: 'success' });
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
        await axios.delete(`http://localhost:8080/api/v1/jobs/${rowId}`);
      }

      // Handle success or show a notification
      enqueueSnackbar('Jobs Deleted', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting', { variant: 'error' });
      // Handle error or show an error notification
    }
  };

  const handleEditRow = (_id) => {
    push(PATH_DASHBOARD.jobs.edit(paramCase(_id)));
  };

  const handleDetails = (_id) => {
    push(PATH_DASHBOARD.jobs.detail(paramCase(_id)));
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
        <title> Jobs | Medirecruiters</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xxl'}>
        <CustomBreadcrumbs
          heading="Manage Jobs"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Manage Jobs', href: PATH_DASHBOARD.general.jobs },
          ]}
          action={
            <>
              <Box>
                <Stack
                  spacing={1}
                  justifyContent="space-between"
                  direction={{ xs: 'column', sm: 'row', md: 'row' }}
                  sx={{ my: 1 }}
                >
                  <Button
                    href={PATH_DASHBOARD.jobs.new}
                    variant="contained"
                    size="medium"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    New Job
                  </Button>
                </Stack>
              </Box>
            </>
          }
        />

        <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

        <Card>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Tabs
              value={filterStatus}
              onChange={handleFilterStatus}
              sx={{
                px: 2,
                bgcolor: 'background.white',
              }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>
          </Stack>

          <Divider />

          <JobTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
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
                <>
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:printer-outline" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:share-outline" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </>
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
                      <JobTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row.jobTitle)}
                        onDetails={() => handleDetails(row.jobTitle)}
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
      (job) => job.jobTitle.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((job) => job.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((job) => job.role === filterRole);
  }

  return inputData;
}
