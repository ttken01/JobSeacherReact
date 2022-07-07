
import Grid from '@mui/material/Grid';

 const appUrl= process.env.REACT_APP_URL

const images = [
    `${appUrl}/img/logo_hoangminh_1642759446.png`,
    `${appUrl}/img/geet_1641798683.png`,
    `${appUrl}/img/east-west_logo_1641371141.png`,
    `${appUrl}/img/logo_-corsair-marine_1641370484.png`,
    `${appUrl}/img/qisda_1639622986.png`,
    `${appUrl}/img/logo-tn_1636768133.png`,
    `${appUrl}/img/bn-tn_1638962580.png`,
    `${appUrl}/img/logo-tn_1634813681.jpg`,
]


export default function SectionCompanies() {

    return(
        <section className="section-companies">
                        <div className="center-div ">
                        <div className="left">
                            <p className="title">Gia tăng cơ hội nghề nghiệp
                            </p>
                            <p className="desc">khi kết nối cùng các công ty hàng đầu tại <br/>TalentNetwork</p>
                        </div>
                        <div className="right">
                            <Grid container spacing={1} >
                            {images.map((x, i) =>
                            <Grid item xs={3} key={i}>
                                <img src={x} alt={x}/>
                            </Grid>
                                )}
                            
                            
                            </Grid>
                            
                        </div>
                    </div>
        </section>
    )

}
