import React, {useState, useEffect} from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import '../css/Planet.css';

const Planet = ({ name, pictureUrl, currentPopulation, id }) => {
    const [landedSpacecrafts, setLandedSpacecrafts] = useState([]);
    console.log(landedSpacecrafts, 'landed')

    useEffect(() => {
        const findLandedSpacecrafts = async () => {
           const spacecrafts = await SpaceTravelApi.getSpacecrafts();
           const spacecraftsData = spacecrafts.data; 
           spacecraftsData.map((d) => {
                if(d.currentLocation === id){
                    return (setLandedSpacecrafts(
                        landed => [...landed, 
                            {
                            'name': d.name, 
                            'currentLocation': d.currentLocation, 
                            'id': d.id, 
                            'key': d.id,
                            'pictureUrl': d.pictureUrl, 
                            'capacity': d.capacity
                            }
                        ]
                    ))
                }
           });
        }

        findLandedSpacecrafts();
    }, [])

    const showLandedSpacecrafts = () => {
        if(landedSpacecrafts.length > 0){
            return (
                landedSpacecrafts.map((s) => {
                    return (
                        
                            <div className='img-container'>
                                <img src={s.pictureUrl} alt="spacecraft" className="img"/>
                            </div>
                    
                    )
                })
            )
        }
    }

    return (
        <>
            <div className="container" key={id}>
                <div className="img-container">
                    <img src={pictureUrl} className="img"/>
                    <p>{name}</p>
                <p>{currentPopulation}</p>
                </div>
                <div className="spaceship-container">
                    {showLandedSpacecrafts()}
                </div>
            </div>
        </>
    )
}

export default Planet; 