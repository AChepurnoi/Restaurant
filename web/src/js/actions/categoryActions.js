import axios from 'axios'


export function getCategories(){
	return{
		type: "CATEGORY_GET",
		payload: axios.get('http://localhost:8080/categories')
	}
}
