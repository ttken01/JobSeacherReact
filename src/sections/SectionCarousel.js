import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import HeaderForm  from '../components/HeaderForm';


function SectionCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            src: 'https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?t=st=1647792333~exp=1647792933~hmac=b4561a531db0e4d244e6b3c74f0ce38b085147d17c0667b3ae8af22786cbedb3&w=1380'
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            src:'https://img.freepik.com/free-vector/professional-people-work_24908-58137.jpg?t=st=1647792333~exp=1647792933~hmac=8d03646748f06ffb7e851262bb96c21a5e01aa96e4863ba6f351bc6682b95f53&w=1380'
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}





function Item(props)
{
    return (
        <section>
            <div className="carousel-component">
                <div className="form-wrapper">
                <HeaderForm/>
                </div>
                {/* <h2>{props.item.name}</h2>
                <p>{props.item.description}</p> */}
                <div>
                <img src={`${props.item.src}`} alt={props.item.src} />
                </div>
                {/* <Button className="CheckButton">
                    Check it out!
                </Button> */}
            </div>
        </section>
    )
}


export default SectionCarousel