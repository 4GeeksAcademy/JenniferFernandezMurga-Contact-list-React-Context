import React, { useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardContact } from "../component/CardContact";
import { Link } from "react-router-dom";


export const Home = () => {

	const {store, actions} = useContext(Context);


  useEffect(()=>{
    actions.getContactList()
  },[])



	return(
		<div>
			<div className="vista">
			<Link to="/add-contact" 
    		className="btn btn-primary">Agregar contacto
			</Link>
			</div>
			
			<div>
			{store.contacts.map((contact, index) => <CardContact key={index} id={contact.id} name={contact.name} email={contact.email}  phone={contact.phone}  address={contact.address}/>)}
			</div>
			
		</div>
);
}
