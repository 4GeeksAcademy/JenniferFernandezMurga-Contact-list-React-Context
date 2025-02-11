import React from "react";
import { ContactForm } from "../component/ContactForm";
import { Link, useLocation} from "react-router-dom";


export const AddContact = () => {
    let location = useLocation ();
  
    return (
     
     <div>
        <div className="text-center">
        <ContactForm pathname={location.pathname}/>
        <Link to={"/"}> or get back to contact</Link>
        </div>
    </div>
    );
};