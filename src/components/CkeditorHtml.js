
import parser from 'html-react-parser';

export default function CkeditorHtml(props) {


    let str= props.data


    let parsed = parser(str)



    return(
        <div className="ckeditor-html">
            {parsed}
        </div>
    )

}


