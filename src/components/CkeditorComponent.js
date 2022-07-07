
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkeditorComponent=({setDataCkeditor, value}) =>{
    
        if(value){
            return(
                <CKEditor
                    editor={ ClassicEditor }
                    data={value}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDataCkeditor(data)
                    }}
                />
            )
        }

 
        return (
            <div >
      
                <CKEditor className="ckeditor"
                    editor={ ClassicEditor }
                    data=""

                    onChange={( event, editor)=>{
                        const data = editor.getData();
                        setDataCkeditor(data)
                    }}

                />
            </div>
        );



 
}

export default CkeditorComponent;
