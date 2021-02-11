

export default function(state= initialState, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.data];//retorna el array con el action.data agregado
        case 'DELETE':
            const newState = state.filter(s => s.mood != action.data.mood && s.description != action.data.description);
            //genera un nuevo array que cumpla con las condiciones: todos menos que contengan los datos pedidos en delete (action.data.mood y action.data.description)
            return newState; //retorna el array con los datos sustraidos por el filtro
        default:
            return state;
    }
}
