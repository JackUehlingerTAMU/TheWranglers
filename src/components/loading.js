import {useState} from "react"
import "../App.css"
/**
 * 
 * @returns A fun loading icon
 */
export default function Loading(){
    return(
          <div className="loader-container">
      <div className="loader" />
    </div>
  );
}