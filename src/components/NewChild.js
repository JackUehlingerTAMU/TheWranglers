import "../App.css"
export default function NewChild(){
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
            <input type="dropdown" id="plate_state" name="plate_state" />
           
            
            
            <input className="submit-button" type="submit" value="Submit To School"></input>
            </div>
        </form>
        </>
    );
}