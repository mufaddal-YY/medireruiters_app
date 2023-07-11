import { paramCase } from 'change-case';
import { Children, useState, useEffect, useCallback } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
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
  Switch,
  Typography,
  FormControlLabel,
  Input,
} from '@mui/material';
import TextField from '@mui/material/TextField';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';

// sections
import { CandidateTableToolbar, CandidateTableRow } from '../../../sections/@dashboard/appliedCandidates/list';
import { label } from 'yet-another-react-lightbox/core';
import { FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useSnackbar } from '../../../components/snackbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'dob', label: 'DOB', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

CandidateListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function CandidateListPage() {

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

  const FILE_TYPE_OPTIONS = ['excel'];

  const { themeStretch } = useSettingsContext();

  const { push } = useRouter();

  const [tableData, setTableData] = useState([]);

  // const router = useRouter();
  // const { creator } = router.query;

  // const [jobApplications, setJobApplications] = useState([]);
  // const [candidates, setCandidates] = useState([]);
  // const [currentCandidates, setCurrentCandidates] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const getJobApplications = async () => {
  //   try {
  //     const response = await axios.get('https://medi-server.onrender.com/api/v1/jobApplications');
  //     console.log('API response:', response.data);
  //     setJobApplications(response.data); // Assuming you have a state variable named "jobs" to store the response data
  //   } catch (error) {
  //     console.error('API error:', error);
  //   }
  // };

  // const getCandidates = async () => {
  //   try {
  //     const response = await axios.get('https://medi-server.onrender.com/api/v1/candidates');
  //     console.log('API response:', response.data);
  //     setCandidates(response.data); // Assuming you have a state variable named "jobs" to store the response data
  //   } catch (error) {
  //     console.error('API error:', error);
  //   }
  // };

  // useEffect(() => {
  //   getCandidates();
  //   getJobApplications();
  // }, []);

  // useEffect(() => {
  //   if (candidates.length > 0) {
  //     const filteredCandidates = candidates.filter(candidate => {
  //       const creatorFromJobApplication = jobApplications.find(
  //         application => paramCase(application.creator) === paramCase(candidate.creator)
  //       );
  //       return creatorFromJobApplication !== undefined;
  //     });
  //     console.log(filteredCandidates);
  //     setCurrentCandidates(filteredCandidates);
  //   }
  // }, [candidates, jobApplications]);

  const router = useRouter();
  const { creator } = router.query;

  const [jobApplications, setJobApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [currentCandidates, setCurrentCandidates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getJobApplications = async () => {
    try {
      const response = await axios.get('https://medi-server.onrender.com/api/v1/jobApplications');
      console.log('API response:', response.data);
      setJobApplications(response.data);
    } catch (error) {
      console.error('API error:', error);
    }
  };

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
    const fetchData = async () => {
      try {
        await Promise.all([getJobApplications(), getCandidates()]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      const filteredCandidates = candidates.filter(candidate => {
        const creatorFromJobApplication = jobApplications.find(
          application => paramCase(application.creator) === paramCase(candidate.creator)
        );
        return creatorFromJobApplication !== undefined;
      });
      console.log(filteredCandidates);
      setCurrentCandidates(filteredCandidates);
    }
  }, [candidates, jobApplications]);



  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');
  const [openUploadFile, setOpenUploadFile] = useState(false);

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
  
      await axios.delete(`https://medi-server.onrender.com/api/v1/candidates/${_id}`);
  
      // Show success snackbar
      enqueueSnackbar('User Deleted', { variant: 'success' });
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
        await axios.delete(`https://medi-server.onrender.com/api/v1/candidates/${rowId}`);
      }
  
      // Handle success or show a notification
       enqueueSnackbar('Users Deleted', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error deleting', { variant: 'error' });
      // Handle error or show an error notification
    }
  };
  

  const handleEditRow = (_id) => {
    push(PATH_DASHBOARD.candidate.edit(paramCase(_id)));
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

      <Container maxWidth={themeStretch ? false : 'xxl'}>
        

        <Card>

          <Divider />

          <CandidateTableToolbar
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
                      <CandidateTableRow
                        key={row._id}
                        row={row}
                        selected={selected.includes(row._id)}
                        onSelectRow={() => onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row.name)}
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
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
