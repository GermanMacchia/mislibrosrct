import React from 'react';
import axios from 'axios';

export default function Registro () {
		



	return(
			<div className= "Logform">
				<h2>Registrate</h2>
				<form action="Registro">
					<label>User </label>
					<input type="text" /><br/>
					<label>Pass </label>
					<input type="text" /><br/>
					<label>Mail </label>
					<input type="text" /><br/>
					<label>Celu </label>
					<input type="text" /><br/><br/>
					<input type= "submit" value= "Registrate" />
				</form>
			</div>
		);
}