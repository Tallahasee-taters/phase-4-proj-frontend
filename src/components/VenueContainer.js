import React from 'react';
import Venue from './Venue';

const VenueContainer = ({venues}) => {
    const mappedVenues = venues.map(venue => <Venue key={venue.id} venue={venue}/>)
    return (
        <div>
          {mappedVenues}  
        </div>
    );
}

export default VenueContainer;
