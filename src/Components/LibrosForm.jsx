import React from 'react';

export default function LibrosForm () {


	return(
			<div className= "homeform">
				<h2>Ingresar un libro</h2>
				<div className="floatLeft">
					<form action="Registro">
						<label>Nombre </label><br/>
						<input type="text" placeholder="Nombre del libro" /><br/>
						<label>Categoria </label><br/>
						<input type="text" placeholder="Categoria" /><br/>
						<label>Persona</label><br/>
						<input type="text" placeholder="Prestado a..."/><br/>
					</form>
				</div>
				<div>
					<form>
						<label>Descripcion </label><br/>
						<textarea type="textarea" placeholder="Descripcion" /><br/><br/>
						<input type= "submit" value= "Guardar" />
					</form>
				</div>
			</div>
		)

}