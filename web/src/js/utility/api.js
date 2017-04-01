import axios from 'axios'


class api {

	constructor() {
		this.client = axios.create({
			baseURL: "http://localhost:8080/"
		});
	}

	loadCategories(){
		return this.client.get('/categories');
	}

	createCategory(data){
		const {title, image} = data;
		let formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
		return this.client.post('/categories', formData);
	}

	deleteCategory(id){
		return this.client.delete('/categories/' + id);
	}

	createDish(data){
		const {title, description, categoryId, image} = data;
		let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('image', image);
		return this.client.post('/dishes', formData);
	}

	loadDishes(category){
		return this.client.get('/categories/'+ category + '/dishes');
	}


	deleteDish(id){
		return this.client.delete('/dishes/' + id);
	}
}

export default (new api());
