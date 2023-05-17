import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';
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
import JobDetail from 'src/pages/dashboard/jobs/[title]/job-detail';

// ----------------------------------------------------------------------
const statusess = ['Active', 'Inactive', 'Closed'];

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
  id,
  initialStatuses,
}) {
  const { company, avatarUrl, name, phoneNumber, role, status } = row;

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

  const [statuses, setStatuses] = useState(initialStatuses);

  const handleStatusesChange = (event) => {
    const newStatuses = event.target.value;
    setStatuses(newStatuses);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          
            

            <Link  href={PATH_DASHBOARD.jobs.jobDetail}>
              <Typography sx={{ color: 'black', textDecoration: "none" }} variant="subtitle2" noWrap>
                {company}
              </Typography>
            </Link>
          
        </TableCell>


        <TableCell align="left">{name}</TableCell>
        

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {role}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {phoneNumber}
        </TableCell>

        <TableCell align="left">
          {/* <CustomSmallSelect value={statuses} onChange={handleStatusesChange}>
            {statusess.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </CustomSmallSelect> */}

          <Label
            variant="soft"
            color={status === 'banned' ? 'error' : status === 'closed' ? 'info' : 'success'}
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
