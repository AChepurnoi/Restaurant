import axios from 'axios'


class api {

	constructor() {
		this.client = axios.create({
			baseURL: "http://localhost:3000/api/",
			responseType: 'json'
		});

	}

	setToken(token){
		this.client.defaults.headers.common['Authorization'] = 'bearer ' + token;
	}

	clearToken(){
		delete this.client.defaults.headers.common["Authorization"];
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
		const {title, description, categoryId, image, price} = data;
		let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
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
        formData.append('scope', 'read write');
		return this.client.post('/oauth/token', formData, {headers: headers});
	}

	register(data){
		
		return this.client.post('/users', data);
	}

	checkToken(token){
		let headers = {'Authorization': 'Basic cmVhY3RfYXBwOmtwaV9sdWNoaXlfdnV6'}
		let formData = new FormData();
        formData.append('token', token);
		return this.client.post('/oauth/check_token', formData, {headers: headers});
	}

	refreshToken(token){
		let headers = {'Authorization': 'Basic cmVhY3RfYXBwOmtwaV9sdWNoaXlfdnV6'}
		let formData = new FormData();
        formData.append('refresh_token', token);
        formData.append('grant_type','refresh_token');
		return this.client.post('/oauth/token', formData, {headers: headers});
	}

	loadTables(){
		return this.client.get('/tables');
	}

	createTable(data){
		return this.client.post('/tables', data);
	}

	deleteTable(id){
		return this.client.delete('/tables/' + id);
	}

	loadBooking(table){
		return this.client.get('/tables/' + table + '/booking');
	}

	bookTable(table, data){
		return this.client.post('/tables/' + table + '/booking', data);
	}

	loadUser(name){
		return this.client.get('/users/' + name);
	}

	loadCart(){
		return this.client.get('/cart');
	}

	addToCart(id){
		return this.client.post('/cart/dish/' + id);
	}

	removeFromCart(id){
		return this.client.delete('/cart/dish/' + id);
	}

	updateDiscount(id, data){
		return this.client.put('/dishes/' + id, data);
	}

	loadSales(){
		return this.client.get('/sales');
	}

	createOrder(){
		return this.client.post('/cart/order')
	}

}

export default (new api());
