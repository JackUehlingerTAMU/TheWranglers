import { supabase } from "../supabaseClient"; // Supabase Database
import "../App.css" // CSS
/**
 * 
 * @returns Header for the page, used on the Parent Portal
 */
export default function Header(){
    const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error);
    else window.location.reload(); // optional: refresh page after logout
    };

    return(
        <div className="bar ">
            <h1 className="bar-item">Pebble Creek Elementary</h1>
            <button className="main-btn bar-item" onClick={handleLogout}>Logout</button>
        </div>
    );
}