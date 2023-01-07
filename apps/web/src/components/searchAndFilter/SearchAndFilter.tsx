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
import InputLabel from '@mui/material/InputLabel';
import { IncidentType, Status } from '@prisma/client';

interface Props {
  searchText: string;
  incidentType: IncidentType | undefined;
  status: Status | undefined;
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
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={incidentType ? incidentType : ''}
              label="Incident Type"
              onChange={handleIncidentTypeChange}
            >
              <MenuItem value={IncidentType.HIGH}>High</MenuItem>
              <MenuItem value={IncidentType.MEDIUM}>Medium</MenuItem>
              <MenuItem value={IncidentType.LOW}>Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={status ? status : ''}
              label="Incident Type"
              onChange={handleStatusChange}
            >
              <MenuItem value={Status.UNASSIGNED}>Unassigned</MenuItem>
              <MenuItem value={Status.ASSIGNED}>Assigned</MenuItem>
              <MenuItem value={Status.ACKNOWLEDGED}>Acknowledged</MenuItem>
              <MenuItem value={Status.RESOLVED}>Resolved</MenuItem>
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
