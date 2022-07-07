import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';

export default function GroupedSelect(props) {
  const data = props.data



  return (
    <div>
        <InputLabel htmlFor="grouped-native-select">{props?.label}</InputLabel>
        <Select 
         name={props?.name} native defaultValue="" id="grouped-native-select" 
         label={props?.label}
          onChange={(e) => {
          const idx = e.target.selectedIndex
          const option = e.target.querySelectorAll('option')[idx]
          const id = option.getAttribute('data-id')
          props.setDataMajorId(id)
        }}>
          <option aria-label="None" value="" />
          {
            data.map((item,index)=> {
              return <optgroup key={index} label={item?.name}>
                {item.majors.map((major,subIndex)=>{
                    return <option data-id={major.id} key={subIndex} value={major.name}>{major.name}</option>
                })}
              </optgroup>
            }
          )}
  
        </Select>
    </div>
  );
}
