import React,{useState,useEffect} from "react";
import classes from './Card.module.css';
import star from '../../public/Star.svg';
import starFilled from '../../public/Star_fill.svg';

interface MenuItem{
    image: string;
    name: string;
    popular: boolean;
    price: number;
    rating: number;
    votes: number
}

const Card : React.FC = ()=>{
     const [menu,setMenu] = useState<MenuItem[] | null>(null)
     const [activeBtn, setActiveBtn] = useState<number>(0);

    //  const formatRating = (rating :any) => {
    //     return rating % 1 === 0 ? rating.toFixed(1) : rating.toString();
    // };

    useEffect(()=>{

        async function fetchMenu() {
            try{
                const menuResponse = await fetch(`https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json`);
                const menuData : MenuItem[]= await menuResponse.json();
                setMenu(menuData)

            }
            catch(error){
              console.log('Could not fetch menu details',error)
            }
              
          } 
          fetchMenu()
    },[])


    return <main className={classes.card}>
     <header className={classes.intro}>

            <h1>Our Collection</h1>
            <p>Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins,expertly roasted in small batches and shipped fresh weekly.</p>
            <div className={classes.navigationBtns}>
            <button type="button" 
            className={activeBtn === 0 ? classes.active : ''}
            onClick={()=>setActiveBtn(0)}
            >All Products</button>
            <button type="button"
            className={activeBtn === 1 ? classes.active : ''}
            onClick={()=>setActiveBtn(1)}
            >Available Now</button>

        </div>

        </header>
        <section className={classes.menu}>
            {menu && menu.map((item, index) => (
                <div key={index} className={classes.menuItem}>

                    <img src={item.image} alt={item.name} className={classes.coffeeType}/>
                    <small className={item.popular ? `${classes.popularText}` : ''}>{item.popular ? 'Popular' : ''}</small>
                    <div className={classes.description}>
                        <div className={classes.nameAndPricing}>
                            <p className={classes.name}>{item.name}</p>
                            <p className={classes.pricing}>{item.price}</p>
                        </div>
                        <div className={classes.ratings}>
                         {item.rating ? <img src={starFilled} alt="star-filled-icon"/> : <img src={star} alt="star-icon"/>}
                            {/* <p className={classes.rating}>{formatRating(item.rating)}</p> */}
                            {/* <p className={classes.rating}>{item.rating % 1 === 0 ? (item.rating).toFixed(1) : item.rating}</p> */}
                            <p className={classes.rating}>{item.rating}</p>


                            {/* <p>{item.votes ? (item.votes) : 'No ratings'}</p> */}
                            {activeBtn === 0 && item.name === "Chocolate Coffee" ? (
                                <p className={classes.vote}>
                                    {item.votes ? (
                                        <>
                                            ({item.votes} votes) <span className={classes.label}>Sold Out</span>
                                        </>
                                    ) : (
                                        // <span className={classes.label}>Sold Out</span>
                                        <p className={classes.vote}>
                                        {item.votes ? (`${item.votes} votes`) : 'No ratings'}
                                    </p>
                                    )}
                                </p>
                            ) : (
                                <p className={classes.vote}>
                                    {item.votes ? <>({item.votes} votes) </>: 'No ratings'}
                                </p>
                            )}
                             

                            </div>
                    </div>
                </div>
            ))}
        </section>
    </main>

}
export default Card;