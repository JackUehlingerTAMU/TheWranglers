import "./../App.css";
import { useNavigate } from "react-router-dom";
export default function Home(){
  const navigate = useNavigate();
    return (
    <div className="app">
      <h1 className="title">Pebble Creek Elementary</h1>

      <div className="button-row">
        <button className="main-btn">Parent/Guardian Login</button>
        <button className="main-btn">Staff Login</button>
      </div>

      <div className="button-row">
          <button className="main-btn" onClick={() => navigate("/create-account")}>
            Create New Account
          </button>
        <button className="main-btn">Volunteer Login</button>
      </div>

    </div>
    );
}