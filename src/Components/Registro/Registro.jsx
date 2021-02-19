import React from 'react';
import axios from 'axios';

export default function Registro () {
		



	return(
			<div className= "Logform">
				<h2>Registrate</h2>
				<form action="Registro">
					<label>User </label>
					<input type="text" placeholder="Nombre de usuario" /><br/>
					<label>Pass </label>
					<input type="text" placeholder="Ingrese una contraseña" /><br/>
					<label>Mail </label>
					<input type="text" placeholder="Ingrese un email" /><br/>
					<label>Celu </label>
					<input type="text" placeholder="Nro. de contacto"/><br/><br/>
					<input className="button" type= "submit" value= "Registrate" />
				</form>
			</div>
		);
}