import "./../App.css";
export default function Home(){
    return (
    <div className="app">
      <h1 className="title">Pebble Creek Elementary</h1>

      <div className="button-row">
        <button className="main-btn">Parent/Guardian Login</button>
        <button className="main-btn">Staff Login</button>
      </div>

      <div className="create-account">
        <button className="main-btn">Create New Account</button>
      </div>

    </div>
    );
}