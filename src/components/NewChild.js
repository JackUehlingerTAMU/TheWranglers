import "../App.css"
export default function NewChild(){
    const GRADES= [{name:"Kindergarden", abr: "KG"},
                   {name:"1st", abr: "1"}, 
                   {name:"2nd", abr: "2"}, 
                   {name:"3rd", abr: "3"}, 
                   {name:"4th", abr: "4"}, 
                   {name:"5th", abr: "5"}, 
    ]
    return( <>
        <h2>New Child Information</h2>
        <form className="mini-form-container">
            <div class="form-column">
       
            <label for="plate_state">Child First Name:</label>
            <input type="text" id="plate_state" name="plate_state" />
       

            <label for="plate_state">Child Middle Name:</label>
            <input type="text" id="plate_state" name="plate_state" />
          

            
            <label for="plate_state">Child Last Name:</label>
            <input type="text" id="plate_state" name="plate_state" />
           

            
            <label for="plate_state">Child Grade:</label>
            <select id="plate_state" name="plate_state" className="select_text" >
                {GRADES.map(grade =>
                    <option key={grade.abr} value={grade.abr} >{grade.name}</option>
                )}
            </select>
           
            
            
            <input className="submit-button" type="submit" value="Submit To School"></input>
            </div>
        </form>
        </>
    );
}