import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


function LibrosList (props) {

	const [librosHtml, setLibrosHtml] = useState();
	const [libros, setLibros] = useState();

	useEffect(() => {

		async function getLibros () { 
			await axios.get(`//localhost:8000/libro`, {
				  headers: {
				    'Authorization': props.token[0].token
				  }
				})
				.then((res) => {
				  setLibros(res.data.respuesta)

				})
				.catch((error) => {
				  console.error(error)
				});
		}
		getLibros();

		if(libros != undefined){

        const librosAux = libros.map((libro, index) => (
            <tr key={index}>
            	<td id="indexlibro"><p><strong>{index + 1}</strong></p></td> 
                <td id="nombrelibro"><p>{libro.nombre}</p></td>   
                <td id="descripcionlibro"><p>{libro.descripcion}</p></td>
            	<td id="personalibro"><p>{libro.persona_id}</p></td>
            </tr>
        ))
		setLibrosHtml(librosAux);
		}else(console.log('esperando'))

	}, [libros])

		
	return(
		<div className='contentList'>
			<h2>Tu Bibiblioteca</h2>
			<table>
	            <thead>
	                <tr>
	                	<th>N°</th>
	                    <th>Nombre</th>
	                    <th id='descripcion_titulo'>Descripción</th>
	                    <th>Prestado al ID</th>
	                </tr>
	            </thead>
	            <tbody>
	                {librosHtml}
	            </tbody>
	        </table>
		</div>
	);
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(LibrosList);