import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Link from 'next/link';
import { paramCase } from 'change-case';

// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { phoneNumber } from 'src/_mock/assets';
import { CustomSmallSelect } from 'src/components/custom-input';
import { PATH_DASHBOARD } from 'src/routes/paths';
import JobDetail from 'src/pages/dashboard/jobs/[jobTitle]/job-detail';
import axios from 'axios';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------
const statusess = ['Active', 'Inactive'];

JobTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function JobTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onDetails,
  id,
  initialStatuses,
}) {
  
  const { jobTitle, salary, lang, createdAt, status } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleStatusesChange = (event, cellId) => {
    const newStatus = event.target.value;

    // Make an HTTP POST request to the API endpoint
    axios
      .post('/api/v1/jobs', { cellId, newStatus })
      .then((response) => {
        console.log('Status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={logoUrl} /> */}

            <Typography
              onClick={() => {
                onDetails();
              }}
              sx={{ color: 'black', cursor: 'pointer' }}
              variant="subtitle2"
              noWrap
            >
              {jobTitle}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {salary}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {lang}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {createdAt}
        </TableCell>

        <TableCell align="center">
          <Label
            variant="soft"
            color={(status === 'Inactive' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-outline" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
