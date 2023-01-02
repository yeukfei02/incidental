import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../helper/url';

interface Props {
  page: string;
  incidentId?: string;
}

function CustomBreadcrumbs({ page, incidentId }: Props) {
  const navigate = useNavigate();

  const handlePageClick = (page: string) => {
    switch (page) {
      case 'Incidents':
        navigate(Url.INCIDENTS);
        break;
      case 'Profile':
        navigate(Url.PROFILE);
        break;
      case 'Settings':
        navigate(Url.SETTINGS);
        break;
      case 'Incident Detail':
        if (incidentId) {
          navigate(Url.INCIDENT_DETAIL.replace(':id', incidentId));
        }
        break;
      default:
        navigate(Url.HOME);
        break;
    }
  };

  const renderBreadCrumbs = () => {
    let breadCrumbs = (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <div className="cursor-pointer" color="inherit" onClick={() => navigate(Url.HOME)}>
          Home
        </div>
        <Typography color="text.primary">{page}</Typography>
      </Breadcrumbs>
    );

    if (page === 'Incident Detail') {
      breadCrumbs = (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <div className="cursor-pointer" color="inherit" onClick={() => navigate(Url.HOME)}>
            Home
          </div>
          <div className="cursor-pointer" color="inherit" onClick={() => handlePageClick(page)}>
            {page}
          </div>
          <Typography color="text.primary">{page}</Typography>
        </Breadcrumbs>
      );
    }

    return breadCrumbs;
  };

  return <div role="presentation">{renderBreadCrumbs()}</div>;
}
export default CustomBreadcrumbs;
