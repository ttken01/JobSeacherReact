import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SideMenuItem from '../components/SideMenuItem';

export const mainListItems = (
  <React.Fragment>
    <SideMenuItem name="Thông tin của tôi" icon={<DashboardIcon />} link="/dashboard/home" />
   
    {/* <SideMenuItem name="Thông báo việc làm" icon={<DashboardIcon />} link="/dashboard" /> */}
    {/* <SideMenuItem name="Nhà tuyển dụng của tôi" icon={<DashboardIcon />} link="/dashboard" /> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);