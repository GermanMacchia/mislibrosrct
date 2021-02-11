import React from 'react';
import shelve from '../Assets/shelve.jpg';

export default function Nav () {



	return(
		<>
			<div id= "Nav">
				<h1>Mis Libros app</h1>
				<img src= {shelve} alt="shelve" />
				<div id="clear" />
			</div>
			
		</>
	);
}