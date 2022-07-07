import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function DatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          inputFormat="MM/DD/yyyy"  
          value={props.value}
          onChange={(newValue) => {
                props.setDateValue(newValue._d);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
