import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditarLibro from './EditarLibro'
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

function LibrosList (props) {

	const alert = useAlert();

	const [librosHtml, setLibrosHtml] = useState();
	const [libros, setLibros] = useState();
	const [editar, setEditar] = useState();
	const [libro, setLibro] = useState();
	const [reload, setReload] = useState(0)

	const handleDelete = (e) => {
		e.preventDefault()

			async function deleteLibro () {
				const opcion = window.confirm('¿Seguro que quieres eliminar?')
				if(opcion == true){
					await axios({
					    method: 'delete',
					    url: `//localhost:8000/libro/` + e.target.value,
					    headers: {'Authorization': props.state.AuthReducer[0].token},
					    })
					.then((res) => {
						alert.success('Se ha borrado correctamente')
						setReload(reload + 1 )
					})
					.catch((error) => {
					  	console.error(error)
					  	alert.error(`¿El libro esta prestado! No es posible borrarlo`)

					});
				}
			}
		deleteLibro ();
	}

	// EDITAR LIBRO

	const handleEditar = (e) => {
		e.preventDefault()
		
			async function editarLibro (e) {
				setEditar(<EditarLibro id={e.target.value} />);
			}
		editarLibro(e);
	}

	const handleDevolver = (e) => {
		e.preventDefault()

		async function devolverLibro () {
				await axios({
				    method: 'put',
				    url: `//localhost:8000/libro/devolver/` + e.target.value,
				    headers: {'Authorization': props.state.AuthReducer[0].token},
				    })
				.then((res) => {
					alert.success("El libro a vuelto a tu bibiblioteca")
					setReload(reload + 1 )

				})
				.catch((error) => {
				  	console.error(error)
				  	alert.show("El libro no esta prestado")
				}
		)}
		devolverLibro();
	}


	useEffect(() => {
		async function getLibros () { 
			await axios.get(`//localhost:8000/libro`, {
				  headers: {
				    'Authorization': props.state.AuthReducer[0].token
				  }
				})
				.then((res) => {
				  setLibros(res.data.respuesta)
				})
				.catch((error) => {
				  console.error(error)
				});
			}
		getLibros ();
		
	}, [props.state.ChangeReducer, reload, editar])

	useEffect(() => {
		if(libros != undefined){
	        const librosAux = libros.map((libro, index) => (
	            <tr key={index}>
	            	<td id="indexlibro"><p><strong>{index + 1}</strong></p></td> 
	                <td id="nombrelibro"><p>{libro.nombre}</p></td>
	                <td id="categorialibro"><p>{libro.categoria_id}</p></td>    
	                <td id="descripcionlibro"><p>{libro.descripcion}</p></td>
	            	<td id="personalibro"><p>{libro.persona_id}</p></td>
	            	<td id="devolverBtt"><button onClick={handleDevolver} value= {libro.id}>↕</button></td>
	            	<td id="deleteBtt"><button onClick={handleDelete} value= {libro.id}>X</button></td>
					<td id="editarBtt"><button onClick={handleEditar} value= {libro.id}>E</button></td>
	            </tr>
	        ))
			setLibrosHtml(librosAux);
			}
	}, [libros])


		
	return(
		<div className='contentList'>
			<h2>Tu Bibiblioteca</h2>
			<table>
				<thead>
					<tr>
	                	<th>N°</th>
	                    <th>Nombre</th>
	                    <th>Categoría</th>
	                    <th id='descripcion_titulo'>Descripción</th>
	                    <th>Persona
	                    	-ID-</th>
	                    <th>Devolver</th>
	                    <th>Borrar</th>
						<th>Editar</th>
	                    
	                </tr>
                </thead>
	            <tbody>
	                {librosHtml}
	            </tbody>
	        </table>
			{editar}
		</div>
	);
}

const mapStateToProps = (state) =>{
	return {state}
}

export default connect(mapStateToProps, null)(LibrosList);

