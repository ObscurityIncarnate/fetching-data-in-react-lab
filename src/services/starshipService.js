import axios from "axios";
const baseUrl = "https://swapi.info/api/vehicles";
const StarshipService =()=>{
    return axios.get(baseUrl);
}

StarshipService()

export default StarshipService;