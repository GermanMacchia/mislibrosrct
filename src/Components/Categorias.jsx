import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Nav from './Nav';
import LibrosForm from './LibrosForm'



function Categorias (props) {

	const [libros, setLibros] = useState({});



	return(
		<>
			<Nav />
			<div className='display'>
				<div className='contentForm'>
					<LibrosForm />
				</div>
				<div className='contentList'>
					<h1> Aca Categorias </h1>
				</div>
			</div>
		</>
		)
}

const mapStateToProps = (state) =>{
	return {token: state}
}

export default connect(mapStateToProps, null)(Categorias);

