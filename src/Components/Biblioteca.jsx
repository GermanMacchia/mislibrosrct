import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';



class Biblioteca extends Component  {

	state = {
		data: []
	}



	render(){

		return (
				<>
					<table>


						<caption>Mis Libros</caption>
						<thead>
							<tr>
								<th>Id</th>
								<th>Nombre</th>
								<th>Descripción</th>
								<th>Prestado a</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</>
			);
		}
}
		


export default Biblioteca;