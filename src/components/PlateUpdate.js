export default function PlateUpdate(){
    return(<>
        <h2>Plate Update Information:</h2>
        <form className="mini-form-container">
            <div className="form-column">
            <label for="plate_state">Plate State:</label>
            <input type="text" id="plate_state" name="plate_state" />
            

           
            <label for="plate_state">Plate Number:</label>
            <input type="text" id="plate_state" name="plate_state" />
            
            <input  className= "submit-btn" type="submit" value="Submit to School"></input>
            </div>
        </form>

        </>

    );
}