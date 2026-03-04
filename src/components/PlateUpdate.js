import { supabase } from "../supabaseClient";
import {useState} from "react";
export default function PlateUpdate({parent_id}){
    const US_STATES = [
        { name: "Alabama", abbr: "AL" },
        { name: "Alaska", abbr: "AK" },
        { name: "Arizona", abbr: "AZ" },
        { name: "Arkansas", abbr: "AR" },
        { name: "California", abbr: "CA" },
        { name: "Colorado", abbr: "CO" },
        { name: "Connecticut", abbr: "CT" },
        { name: "Delaware", abbr: "DE" },
        { name: "Florida", abbr: "FL" },
        { name: "Georgia", abbr: "GA" },
        { name: "Hawaii", abbr: "HI" },
        { name: "Idaho", abbr: "ID" },
        { name: "Illinois", abbr: "IL" },
        { name: "Indiana", abbr: "IN" },
        { name: "Iowa", abbr: "IA" },
        { name: "Kansas", abbr: "KS" },
        { name: "Kentucky", abbr: "KY" },
        { name: "Louisiana", abbr: "LA" },
        { name: "Maine", abbr: "ME" },
        { name: "Maryland", abbr: "MD" },
        { name: "Massachusetts", abbr: "MA" },
        { name: "Michigan", abbr: "MI" },
        { name: "Minnesota", abbr: "MN" },
        { name: "Mississippi", abbr: "MS" },
        { name: "Missouri", abbr: "MO" },
        { name: "Montana", abbr: "MT" },
        { name: "Nebraska", abbr: "NE" },
        { name: "Nevada", abbr: "NV" },
        { name: "New Hampshire", abbr: "NH" },
        { name: "New Jersey", abbr: "NJ" },
        { name: "New Mexico", abbr: "NM" },
        { name: "New York", abbr: "NY" },
        { name: "North Carolina", abbr: "NC" },
        { name: "North Dakota", abbr: "ND" },
        { name: "Ohio", abbr: "OH" },
        { name: "Oklahoma", abbr: "OK" },
        { name: "Oregon", abbr: "OR" },
        { name: "Pennsylvania", abbr: "PA" },
        { name: "Rhode Island", abbr: "RI" },
        { name: "South Carolina", abbr: "SC" },
        { name: "South Dakota", abbr: "SD" },
        { name: "Tennessee", abbr: "TN" },
        { name: "Texas", abbr: "TX" },
        { name: "Utah", abbr: "UT" },
        { name: "Vermont", abbr: "VT" },
        { name: "Virginia", abbr: "VA" },
        { name: "Washington", abbr: "WA" },
        { name: "West Virginia", abbr: "WV" },
        { name: "Wisconsin", abbr: "WI" },
        { name: "Wyoming", abbr: "WY" }
        ];
    const parentId={parent_id};
    const idval=parentId.parent_id;
    const [plateNumber,setPlateNumber]= useState("");
    const [plateState,setPlateState]= useState("");
    const handleSubmit= async (e) =>{
        e.preventDefault();
        
        const data= {
            plate_state: plateState,
            plate_number: plateNumber
        };
        
        try{
        const { error} =await supabase
            .from("parent")
            .update(data)
            .eq("id", idval)
            .select("*");
        if(error){
            console.error("Plate unable to be updated: ", error);
            alert("Plate info failed update.")
        }
        else{
        
            alert("success");
        }
    }
    catch(error){
        console.error("Error:", error);
        alert("Failed to submit licence plate info.");
    }
    }
            


    return(<>
        <h2>Plate Update Information:</h2>
        <form className="mini-form-container" onSubmit={handleSubmit} >
            <div className="form-column">
            <label for="plate_state">Plate State:</label>
            <select id="plate_state" name="plate_state" className="select_text" value={plateState} onChange={(e)=>setPlateState(e.target.value)}>
            { US_STATES.map( state => 
                <option key={state.name} value={state.abbr} >{state.name}</option>
            )}
            </select>
            <label for="plate_number">Plate Number:</label>
            <input type="text" id="plate_number" name="plate_number" onChange={(e)=>setPlateNumber(e.target.value)} />
            
            <input  className= "submit-btn" type="submit" value="Submit to School"></input>
            </div>
        </form>

        </>

    );
}