import {useState, useEffect,forwardRef, useRef, useImperativeHandle } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

 const ImageUpload = forwardRef((props,ref) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  console.log(ref)


  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory 
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

   
      setSelectedFile(e.target.files[0])
  }

  return (
      <div>
          {/* <input type='file'       onChange={onSelectFile}/> */}
          {/* {selectedFile &&  <img src={preview} /> } */}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={onSelectFile}
            ref ={ref}
          />
 
          {selectedFile && <Avatar alt="Remy Sharp" src={preview} sx={{width: 170, height:170}} />}
          <label htmlFor="raised-button-file">
            <Button fullWidth variant="contained" component="div" sx={{ mt: 3, mb: 2 }}>
              Upload
            </Button>
          </label>
    
        
      </div>
  )
})

export default ImageUpload