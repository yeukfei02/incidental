import React from 'react';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import { IncidentType, Status } from '@prisma/client';

interface Props {
  searchText: string;
  incidentType: string[];
  status: string[];
  page: number;
  sortByCreatedAt: boolean;
  sortByUpdatedAt: boolean;
  totalPageCount: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
  handleSortByCreatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortByUpdatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncidentTypeChange: (event: SelectChangeEvent) => void;
  handleStatusChange: (event: SelectChangeEvent) => void;
  handleSearchTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClearFilterClick: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SearchAndFilter({
  searchText,
  incidentType,
  status,
  page,
  sortByCreatedAt,
  sortByUpdatedAt,
  totalPageCount,
  handlePageChange,
  handleSortByCreatedAt,
  handleSortByUpdatedAt,
  handleIncidentTypeChange,
  handleStatusChange,
  handleSearchTextChange,
  handleClearFilterClick,
}: Props) {
  const incidentTypesData = [
    IncidentType.HIGH,
    IncidentType.MEDIUM,
    IncidentType.LOW,
  ];

  const statusesData = [
    Status.UNASSIGNED,
    Status.ASSIGNED,
    Status.ACKNOWLEDGED,
    Status.RESOLVED,
  ];

  return (
    <div className="p-3">
      <div className="mb-5">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={(e) => handleSearchTextChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Incident Type
            </InputLabel>
            <Select
              value={incidentType}
              multiple
              onChange={handleIncidentTypeChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as unknown as string[]).map((value, i) => (
                    <Chip key={i} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {incidentTypesData.map((incidentType, i) => (
                <MenuItem key={i} value={incidentType}>
                  {incidentType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              value={status}
              multiple
              onChange={handleStatusChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as unknown as string[]).map((value, i) => (
                    <Chip key={i} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {statusesData.map((status, i) => (
                <MenuItem key={i} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Pagination
        className="my-5"
        count={totalPageCount}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />

      <div className="flex flex-row items-center">
        <FormControlLabel
          checked={sortByCreatedAt}
          control={<Switch onChange={(e) => handleSortByCreatedAt(e)} />}
          label={`Sort by Created At (${
            sortByCreatedAt ? 'Ascending' : 'Descending'
          })`}
        />
        <FormControlLabel
          checked={sortByUpdatedAt}
          control={<Switch onChange={(e) => handleSortByUpdatedAt(e)} />}
          label={`Sort by Updated At (${
            sortByUpdatedAt ? 'Ascending' : 'Descending'
          })`}
        />
      </div>

      <div className="my-3">
        <Button
          className="w-full"
          color="primary"
          variant="outlined"
          onClick={() => handleClearFilterClick()}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
}

export default SearchAndFilter;
