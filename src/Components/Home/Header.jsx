import React from 'react';
import shelve from '../../Assets/shelve.jpg';

export default function Header () {

	return(
		
			<header id= "header">
				<h1>Mis Libros app</h1>
				<img src= {shelve} alt="shelve" />
				<div className="clear" />
			</header>
	);
}