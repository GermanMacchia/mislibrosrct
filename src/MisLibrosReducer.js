
export default function MisLibrosReducer (state = [], action) {
	switch (action.type){
		case 'TOKEN':
			return [...state, action.data];
		case 'LIBROS':
			return [...state, action.data];
		default:
			return state;
	}
}