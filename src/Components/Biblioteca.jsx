import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Nav from './Nav';
import LibrosForm from './LibrosForm'


function Biblioteca (props) {

	const [libros, setLibros] = useState({});

	const token = props.token[0];

	console.log(token)

	useEffect(async () => {
		const libros = await axios.get(`//localhost:8000/libro`,{
  			headers: {
    		authorization: token
  			}
		});
		console.log(libros)

		return () => {
		};
	}, [setLibros])

	return(
		<>
			<Nav />
			<div className='display'>
				<div className='contentForm'>
					<LibrosForm />
				</div>
				<div className='contentList'>
					<h1> Libros list </h1>
				</div>
			</div>
		</>
		)
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Biblioteca);