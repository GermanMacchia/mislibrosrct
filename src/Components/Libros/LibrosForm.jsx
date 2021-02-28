import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';


function LibrosForm (props) {

	const alert = useAlert();

	const [newPost, setNewPost] = useState(0);
	const [libro, setLibro] = useState({
		    nombre: " ",
		    descripcion: " ",
		    categoria_id: " ",
		    persona_id: null
	})
	
	const [categoria, setCategoria] = useState([]);
	const [persona, setPersona] = useState([])


	const handleNuevoLibro = (e) => {
		setLibro({
			...libro,
			[e.target.name]: e.target.value
			
		});
		console.log(libro);
	}

	
useEffect(() => {
	

			async function verificarCategoria () {
				await axios.get(`//localhost:8000/categoria/`, {
					headers: {
						'Authorization': props.state.AuthReducer[0].token
					}
				})
				.then( (res) => {
					setCategoria(res.data.respuesta)
					console.log(res.data.respuesta)
					})
				.catch( (error) => {
				    alert.error('Esa categoria no existe');
				});
			}

			verificarCategoria ();

			
			async function verificarPersona () {
				await axios.get(`//localhost:8000/persona/`, {
				  headers: {
				    'Authorization': props.state.AuthReducer[0].token
				  }
				})

					.then( (res) => {
						setPersona(res.data.respuesta);
						console.log(res.data.respuesta)
						})
					.catch( (error) => {
					    alert.error('Ese ID de persona no existe');
					});
			}
			
				verificarPersona();

			}, [props])

			
			
	const handleSubmit = (e) => {
			e.preventDefault();	

			async function postLibros () { 
					await axios({
					    method: 'post',
					    url: `//localhost:8000/libro`,
					    data: libro,
					    headers: {'Authorization': props.state.AuthReducer[0].token}
					    })
					.then((res) => {
						alert.success(`Libro agregado`)
						setNewPost(newPost + 1);
						props.onSave(newPost);
						document.getElementById("Lregistro").reset();
						document.getElementById("Tregistro").reset();
					})
					.catch((error) => {
					  console.error(error)
					  alert.error("Debes completar todos los campos");
					});
				}
			postLibros ();
			document.getElementById("Lregistro").reset();
			document.getElementById("Tregistro").reset();
			setLibro({
				nombre: " ",
		    	descripcion: " ",
		    	categoria_id: " ",
		    	persona_id: null
			})
	}
	
	const opcion = categoria.map(categorias =>{
		return <option value = {categorias.id} >{categorias.nombre}</option>		
	})

	const opcionPersona = persona.map(personas =>{
		return <option value = {personas.id} >{personas.nombre}</option>		
	})

	return(
			<div className= "homeform">
				<h2>Ingresar un libro</h2>
				<div className="floatLeft">
					<form id="Lregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleNuevoLibro} placeholder="Nombre del libro" /><br/>
						
						<label>Categoria </label><br/>
						<select name="categoria_id" id="categoria" onChange={handleNuevoLibro} >
						<option value="">Seleccionar:</option>
							{opcion}	
						</select>

						<label>Persona</label><br/>
						<select name="persona_id" id="persona" onChange={handleNuevoLibro} >
						<option value="">Seleccionar:</option>
							{opcionPersona}	
						</select><br/>
					</form>
				</div>
				<div className="bigtext">
					<form id= "Tregistro">
						<label className="descripcion" >Descripcion </label><br/>
						<textarea type="textarea" name="descripcion" onChange={handleNuevoLibro} placeholder="Descripcion" /><br/><br/>
						<input type= "submit" id='guardar_button' onClick= {handleSubmit} value= "Guardar" />
					</form>
				</div>
			</div>
		)

}

const mapStateToProps = (state) =>{
	return {state}
}
const mapActionsToProps = (dispatch) => {
	return {onSave: (newPost) => dispatch({type:'CHANGE', data: newPost})}
}

export default connect(mapStateToProps, mapActionsToProps)(LibrosForm);



