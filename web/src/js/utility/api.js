import axios from 'axios'


class api {

	constructor() {
		this.client = axios.create({
			baseURL: "http://localhost:3000/",
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

	login(log, pass){
		let headers = {'Authorization': 'Basic cmVhY3RfYXBwOmtwaV9sdWNoaXlfdnV6',
						'Content-type': 'application/x-www-form-urlencoded'}
		let formData = new FormData();
        formData.append('username', log);
        formData.append('password', pass);
        formData.append('grant_type', 'password');
        formData.append('score', 'read write');
		return this.client.post('/oauth/token', formData, {headers: headers});
	}

	checkToken(token){
		let headers = {'Authorization': 'Basic cmVhY3RfYXBwOmtwaV9sdWNoaXlfdnV6'}
		let formData = new FormData();
        formData.append('token', token);
		return this.client.post('/oauth/check_token', formData, {headers: headers});
	}
}

export default (new api());
