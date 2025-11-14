import './StarshipCard.css'
const StarshipCard = ({ship})=>{
    const {name, model, vehicle_class, manufacturer} = ship;
    return(
        <div className='card'>
            <h4>{name}</h4>
            <p>Class: {vehicle_class}</p>
            <p>Manufacturer: {manufacturer}</p>
            <p>Model: {model}</p>
        </div>
    )
}
export default StarshipCard ;