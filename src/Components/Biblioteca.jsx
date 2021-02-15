import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import LibrosForm from './LibrosForm'



function Biblioteca (props) {

	const [libros, setLibros] = useState({});



	return(
		<>
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


