import React from 'react';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { IncidentType } from '@prisma/client';

interface Props {
  searchText: string;
  incidentType: IncidentType | undefined;
  page: number;
  sortByCreatedAt: boolean;
  sortByUpdatedAt: boolean;
  totalPageCount: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
  handleSortByCreatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortByUpdatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIncidentTypeChange: (event: SelectChangeEvent) => void;
  handleSearchTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClearFilterClick: () => void;
}

function SearchAndFilter({
  searchText,
  incidentType,
  page,
  sortByCreatedAt,
  sortByUpdatedAt,
  totalPageCount,
  handlePageChange,
  handleSortByCreatedAt,
  handleSortByUpdatedAt,
  handleIncidentTypeChange,
  handleSearchTextChange,
  handleClearFilterClick,
}: Props) {
  return (
    <Card className="mt-5 p-7">
      <Typography variant="h5">
        <span className="font-bold">Search and Filter</span>
      </Typography>

      <div className="my-5">
        <TextField
          className="w-2/6"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => handleSearchTextChange(e)}
        />
      </div>

      <div className="my-5">
        <FormControl className="w-2/6">
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
      </div>

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
    </Card>
  );
}

export default SearchAndFilter;
