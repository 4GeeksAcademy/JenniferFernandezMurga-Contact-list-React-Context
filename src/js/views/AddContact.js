import React from "react";
import { ContactForm } from "../component/ContactForm";
import { Link, useLocation} from "react-router-dom";


export const AddContact = () => {
    let location = useLocation ();
  
    return (
     // para separarlos para que no se vean los dos formulario en la misma vista
     <div>
        <div className="text-center">
            {/* <h1 className="title vistas">{location.pathname === "/add-contact/" ? "Add Contact" : "Eddit contact"}</h1> */}
        <ContactForm pathname={location.pathname}/>
        <Link to={"/"}> or get back to contact</Link>
        </div>
    </div>
    );
};