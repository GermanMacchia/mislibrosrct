import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function LibrosForm (props) {

	const [newPost, setNewPost] = useState(0);

	const [libro, setLibro] = useState({
		    nombre: " ",
		    descripcion: " ",
		    categoria_id: " ",
		    persona_id: null
			})


	const [libroList, setLibroList] = useState();
	const [options, setOptions] = useState();
	const [params, setParams] = useState();
	

	useEffect(() => {

		async function getLibros () { 
			await axios.get(`//localhost:8000/libro`, {
				  headers: {
				    'Authorization': props.state.AuthReducer[0].token
				  }
				})
				.then((res) => {
				  setLibroList(res.data.respuesta)
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		getLibros ();
		
	}, [])


	useEffect(() => {
	if(libroList != undefined){
		const optionAux = libroList.map((libro, index) => (
            	<option key={index}>{index} {libro.nombre}</option>
	        ))
		setOptions(optionAux);
		}
	}, [libroList])

	const handleNuevoLibro = (e) => {
		setLibro({
			...libro,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		async function postLibros () { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000/libro`,
				    data: libro,
				    headers: {'Authorization': props.state.AuthReducer[0].token}
				    })
				.then((res) => {
					console.log('post exitoso')
					setNewPost(newPost + 1);
					props.onSave(newPost);
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		postLibros ();
		document.getElementById("Lregistro").reset();
		document.getElementById("Tregistro").reset();
	}


	const handleSelect = (e) => {
		let num = e.target.value[0];
		setParams(libroList[num].id);
			console.log(params) //BUGGIE
	}


	const handleDelete = (e) => {
		e.preventDefault()

			async function deleteLibro () { 
				await axios({
				    method: 'post',
				    url: `//localhost:8000//libro/:id`,
				    params: e.target.value,
				    headers: {'Authorization': props.state.AuthReducer[0].token}
				    })
				.then((res) => {
					console.log('delete exitoso')
					setNewPost(newPost + 1);
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		deleteLibro ();
	}

	return(
			<div className= "homeform">
				<h2>Ingresar un libro</h2>
				<div className="floatLeft">
					<form id="Lregistro">
						<label>Nombre </label><br/>
						<input type="text" name="nombre" onChange={handleNuevoLibro} placeholder="Nombre del libro" /><br/>
						<label>Categoria </label><br/>
						<input type="text" name="categoria_id" onChange={handleNuevoLibro} placeholder="Categoria" /><br/>
						<label>Persona</label><br/>
						<input type="text" name="persona_id" onChange={handleNuevoLibro} placeholder="Prestado a..."/><br/>
					</form>
				</div>
				<div className="bigtext">
					<form id= "Tregistro">
						<label className="descripcion" >Descripcion </label><br/>
						<textarea type="textarea" name="descripcion" onChange={handleNuevoLibro} placeholder="Descripcion" /><br/><br/>
						<input type= "submit" id='guardar_button' onClick= {handleSubmit} value= "Guardar" />
					</form>
					<form action="Delete">
						<h2>Borrar un libro</h2>
						<select onChange= {handleSelect}>
							{options}
						</select>
						<input type= "submit" id='borrar_button'value= "Borrar" onClick = {handleDelete} />
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



