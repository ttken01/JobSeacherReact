import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'



function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        textDecoration: 'none !important',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function HirerCardItem(props) {

  const data = props.data


  let url=`/profile/${data.id}`




  return (
    <div className="flex-grow" style={{ width: '100%' }}>
      <Link to={url} className="link">
        <Box
          sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
        >
          <Item>

              <img  style={{ height: '250px', width: '250px' }}  src={data.avatar_path} alt="1" />
          </Item>
          <Item sx={{ flexGrow: 1 }}>
          <Typography variant="h5" className="title" gutterBottom component="div">
          Công ty: {data?.first_name} {data?.last_name}
          </Typography>
            {data.rateAvg?(
            <Typography variant="h5" className="title" gutterBottom component="div">
             Rating: {data.rateAvg} 
          </Typography>

            ):(
              <Typography variant="h5" className="title" gutterBottom component="div">
              Rating: chưa xác định
           </Typography>
            )
            }
         
          </Item>
        </Box>
      </Link>
    </div>
  );
}
