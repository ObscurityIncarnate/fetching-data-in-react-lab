import { useEffect, useState } from "react"
import StarshipService from "../../services/starshipService"
import StarshipList from "../StarshipList/StarshipList"


const StarshipSearch  = ({setShips})=>{
    // console.log(ships)
    const [query, setQuery] = useState("")
    const [allSuggestions,setAllSuggestions] = useState([]);
    useEffect(()=>{
        const getSuggestions = async()=>{
            const {data} = await StarshipService();
            setAllSuggestions(data) 
        }
        getSuggestions();
    }, []);
    const searchSuggestions = query.length==0? []: allSuggestions.filter(ship =>{
        const {name, model, manufacturer} = ship;
        if(name.toLocaleLowerCase().includes(query)||model.toLocaleLowerCase().includes(query)||manufacturer.toLocaleLowerCase().includes(query) )   {
            return ship;
        }     
    });
    
    const searchTerm  = searchSuggestions.reduce((accumulator, currentValue) =>{
        const{name, model, manufacturer} =  currentValue;    
        if(accumulator.length<5 && !accumulator.some(term=>{
            return term ===name || term ===model ||term ===  manufacturer;

        })){
            console.log(manufacturer.toLocaleLowerCase(), query)
                if(name.toLocaleLowerCase().includes(query)){
                    accumulator.push(currentValue.name) 
                }else if(model.toLocaleLowerCase().includes(query)){
                    accumulator.push(currentValue.model)
                }else if(manufacturer.toLocaleLowerCase().includes(query)){
                    accumulator.push(currentValue.manufacturer)
                }
            }
        return accumulator
    } , [])

    const handleSubmit=async(event)=>{
        try {
            event.preventDefault();
            const response = await StarshipService();
            const ships = response.data;
            const query = event.target.value;
            const suggestionsedShips = ships.suggestions(ship=>{
                return ship.name.includes(query) || ship.model.includes(query)|| ship.manufacturer.includes(query);
            })
            setShips(suggestionsedShips);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="search" onChange={(e)=>setQuery(e.target.value.toLocaleLowerCase())} name="" id="" />
                <button type="submit">Search</button>
                <section id="suggestions">

                    {searchTerm.map((suggestion, index)=>{
                        return(
                            <div key={index}>
                                <p>{suggestion}</p>
                            </div>
                        )
                    })}
                </section>
            
            </form> 
            <StarshipList ships={searchSuggestions}/>        
        
        
        
        </>
        
    )
}

export default StarshipSearch