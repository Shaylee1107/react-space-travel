import React, {useEffect, useState} from 'react';
import SpacecraftContext from '../context/SpacecraftContext';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpacecraftProvider = ({ children }) => {
    const INITIAL_STATE = [];
    const [spacecrafts, setSpacecrafts] = useState(INITIAL_STATE);
    const [currSpacecraft, setCurrSpacecraft] = useState('');
    const buildSpacecraft = (formData) => {
      setSpacecrafts(crafts => [...crafts, formData]);
  }

  useEffect(() => {
    if(spacecrafts.length > 0){
        const newestSpacecraft = spacecrafts[spacecrafts.length - 1]; 
        newestSpacecraft.currentLocation = "";
        SpaceTravelApi.buildSpacecraft(newestSpacecraft);

        const sendNewSpacecraftToEarth =  async() => {
            const allAPISpacecraft = await SpaceTravelApi.getSpacecrafts();
            const newestFromAPI = allAPISpacecraft.data;
            const bro = newestFromAPI[newestFromAPI.length - 1].id;
            SpaceTravelApi.sendSpacecraftToPlanet({spacecraftId: bro, targetPlanetId: 2})
        }
        
        sendNewSpacecraftToEarth();
    }

  }, [buildSpacecraft, spacecrafts])

    return (
        <>
            <SpacecraftContext.Provider value={{spacecrafts, setSpacecrafts, buildSpacecraft, currSpacecraft, setCurrSpacecraft}}>
                {children}
            </SpacecraftContext.Provider>
        </>
    )
}

export default SpacecraftProvider;