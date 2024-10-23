import React from "react";
import classes from './Listing.module.css';
import heroImg from '../../public/bg-cafe.jpg';
// import Card from "./Card";


const CoffeeListingPage : React.FC = () =>{

    return <main className={classes.main}>

    <header className={classes.heroImg}>
        <img src={heroImg} alt="cafe-pic" />

    </header>
     <nav className={classes.backGround}>

     </nav>
         
    {/* <Card/> */}

    </main>

}
export default CoffeeListingPage;