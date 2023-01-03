import React from 'react';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

interface Props {
  totalPageCount: number;
  page: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
  handleSortByCreatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortByUpdatedAt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortByCreatedAt: boolean;
  sortByUpdatedAt: boolean;
}

function SearchAndFilter({
  totalPageCount,
  page,
  handlePageChange,
  handleSortByCreatedAt,
  handleSortByUpdatedAt,
  sortByCreatedAt,
  sortByUpdatedAt,
}: Props) {
  return (
    <Card className="p-5 mt-5">
      <Typography variant="h5">
        <span className="font-bold">Search and Filter</span>
      </Typography>
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
          control={<Switch onChange={(e) => handleSortByCreatedAt(e)} />}
          label={`Sort by Created At (${
            sortByCreatedAt ? 'Ascending' : 'Descending'
          })`}
        />
        <FormControlLabel
          control={<Switch onChange={(e) => handleSortByUpdatedAt(e)} />}
          label={`Sort by Updated At (${
            sortByUpdatedAt ? 'Ascending' : 'Descending'
          })`}
        />
      </div>
    </Card>
  );
}

export default SearchAndFilter;
