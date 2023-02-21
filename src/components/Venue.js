import React from 'react';
import { useNavigate } from 'react-router-dom';

const Venue = ({venue}) => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/venues/${venue.id}/shows`)
    }

    return (
        <div className='home' onClick={() => handleClick()}>
            <div>{venue.name}</div>
            <div>{venue.city}</div>
        </div>
    );
}

export default Venue;
