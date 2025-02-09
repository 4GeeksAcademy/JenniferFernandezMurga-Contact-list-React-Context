import React, {useContext} from "react";
import {ContactForm} from "../component/ContactForm";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { id } = useParams(); // Extrae el id de los parámetros
    const { store, actions } = useContext(Context);
    let navigate = useNavigate();





    return (
        <div>
            <ContactForm pathname={`/edit-contact/${id}`} />
            <Link to="/"><a>Get back to contact</a></Link>
        </div>
    );
}
