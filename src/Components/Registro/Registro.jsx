import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

export default function Registro () {
	
	const alert = useAlert()

	const [user, setUser] = useState({
		usuario: " ",
		clave: " ",
		email: " ",
		celu: " "
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name] : e.target.value

		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		async function registro () {
			await axios.post(`//localhost:8000/registro`, user)
			    .then((res) => {
                    alert.success('Se ha Registrado correctamente')
                })
                .catch((error) => {
                    console.error(error)
                    alert.error('Nombre de usuario ya registrado')
                });
        }
        registro();
        document.getElementById("registro").reset()
		const log = document.querySelector("#log");
		log.style = "display: block;";
        const reg = document.querySelector("#reg");
		reg.style = "display: none;"; 
	}

	const irLogin = ()=>{
		const log = document.querySelector("#log");
		log.style = "display: block;";
        const reg = document.querySelector("#reg");
		reg.style = "display: none;"; 
	}

	return(
			<div className= "Regform">
				<h2>Registrate</h2>
				<form id="registro">
					<label>User </label>
					<input type="text" name="usuario"  onChange= {handleChange} placeholder="Nombre de usuario" /><br/>
					<label>Pass </label>
					<input type="text" name="clave" onChange= {handleChange} placeholder="Ingrese una contraseña" /><br/>
					<label>Mail </label>
					<input type="email" name="email" onChange= {handleChange} placeholder="Ingrese un email" /><br/>
					<label>Celu </label>
					<input type="text" name="celu" onChange= {handleChange} placeholder="Nro. de contacto"/><br/><br/>
					<input className="button" onClick= {handleSubmit} type= "submit" value= "Registrate" />
				</form>
				<a href="#/" onClick={irLogin}>Login</a>
			</div>
		);
}