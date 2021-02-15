import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Biblioteca from './Biblioteca';
import Header from './Header';


function Home (props) {

	console.log(props)



		return(
			<>

				<nav id="nav">
					<ul>
						<li><a href="/home"><h1>Biblioteca</h1></a></li>
						<li><a href="/categoria"><h1>Categoria</h1></a></li>
						<li><a href="/personas"><h1>Personas</h1></a></li>
					</ul>
				</nav> 
				<div className='clear' />
				<Biblioteca />
			</>

		);
}

const mapStateToProps = (state) => {
    return { token: state }
}

export default connect(mapStateToProps, null)(Home);