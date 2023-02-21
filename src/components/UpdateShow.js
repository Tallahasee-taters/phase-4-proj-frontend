import {useState } from 'react';

const UpdateShow = ({show, setGetShow, setUpdateForm}) => {
    const [update, setUpdate] = useState({
        date: show.date,
        comedian_id: show.comedian.name,
        venue_id: show.venue.name,
        city: show.venue.city
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/v1/shows/${show.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(update)
        })
        .then(resp => {
            if (resp.status === 202){
                resp.json().then(show => {
                    setGetShow(current => {
                        const index = current.findIndex(s => s.id === show.id)
                        return [...current.slice(0, index), show, ...current.slice(index +1)]
                    })
                    setUpdateForm(false)

                })
            }   else {
                resp.json().then((errorObj) => alert(errorObj.errors));
              }
        })
    }

    const handleChange = (e) => {
        setUpdate({...update, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label className="update-form"></label>
            <input type="text" name="date" onChange={handleChange} value={update.date}/>
            <label className="update-form"></label>
            <input type="text" name="comedian_id" onChange={handleChange} value={update.comedian_id}/>
            <label className="update-form"></label>
            <input type="text" name="venue_id" onChange={handleChange} value={update.venue_id}/>
            <label className="show-form">City</label>
                <input type='text' name="city" onChange={handleChange} value={update.city}/>
            <input type="submit"/>
            </form>
        </div>
    );
}

export default UpdateShow;
