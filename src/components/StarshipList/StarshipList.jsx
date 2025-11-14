import StarshipCard from "../StarshipCard/StarshipCard";
import './StarshipList.css';
const StarshipList = ({ships})=>{
    console.log(ships)
    return(
        <>
            <h3>Starships</h3>
            <section id="starships">
                {ships.map((ship,index) =>{
                    return(
                        <StarshipCard key={index} ship={ship}/>
                    )
                })}
            </section>

        </>
    
        
    )
}

export default StarshipList;