
export default function reducer (
	state={
		items: []
	}, action){
	
	switch (action.type){

		case "CLEAR_CART":{
			return {...state, items: []};
		}

		case "LOAD_CART_FULFILLED": {
			return {...state, items: action.payload};
		}

		case "ADD_TO_CART_FULFILLED": {
			let dishOrder = action.payload;
			let cart = [].concat(state.items);
			let idx = cart.findIndex( x => x.id == dishOrder.id);
			if(idx != -1) cart[idx] = dishOrder;
			else cart.push(dishOrder);
			return {...state, items: cart};
		}

		case "REMOVE_CART_ITEM_FULFILLED": {
			let dishOrder = action.payload;
			let cart = [].concat(state.items);
			let idx = cart.findIndex(x => x.id == dishOrder.id);
			cart[idx] = dishOrder;
			cart = cart.filter(x => x.count > 0);

			return {...state, items: cart};
		}

		
	}
	
	return state;
}