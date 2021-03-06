import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {addCheckIn} from "../modules/CheckInManager"
import "./Portfolio.css"

export const CheckInAddForm = () => {
    const currentUser = parseInt(sessionStorage.getItem("realization_user"));
    const timeStamp = Date.now();

    const [checkin, setCheckin] = useState({
        userId:currentUser,
        theBest:"",
        theWorst:"",
        oneThing:"",
        timestamp:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)        
    });

    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
       
        const newCheckIn = {...checkin}
        let selectedVal = event.target.value
        if(event.target.id.includes("Id")) {
            selectedVal= parseInt(selectedVal)
        }
        newCheckIn[event.target.id] = selectedVal
        setCheckin(newCheckIn)
    }

    const handleClickSaveCheckIn = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form
        setIsLoading(true)
        // currentUserId:  parseInt(sessionStorage.getItem("nutshell_user")
        const theBest = checkin.theBest
        const theWorst= checkin.theWorst
        const oneThing= checkin.oneThing
        if (theBest === "" || theWorst === ""|| oneThing === ""){
            window.alert("Please input more information")
        } else{
            addCheckIn(checkin)
            .then(() => history.push("/portfolio"))
        }
    }

    return(
        <form autocomplete="off" className="checkIn-form">
            <h2 className="checkIn-form-header">Check-in</h2>
            <fieldset>
                <div>
                    <label className="checkIn-form-label">...The Best (thing,event,moment,memory)?</label>
                    <input type="text" id="theBest" onChange={handleControlledInputChange} required autoFocus className="form-control" value={checkin.theBest} ></input>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label className="checkIn-form-label">... The Worst?</label>
                    <input type="text" id="theWorst" onChange={handleControlledInputChange} required autoFocus className="form-control" value={checkin.theWorst} ></input>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label className="checkIn-form-label">... One thing I can do differently to be a more effective/better person.</label>
                    <input type="text" id="oneThing" onChange={handleControlledInputChange} required autoFocus className="form-control" value={checkin.oneThing} ></input>
                </div>
            </fieldset>
            <button className="saveCheckIn" onClick={handleClickSaveCheckIn}>record checkin</button>
        </form>
    )
}