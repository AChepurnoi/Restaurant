var jquery = require('../assets/javascripts/jquery-3.2.0.js');
window.jQuery = jquery;
window.$ = jquery;
require('../assets/javascripts/bootstrap.js');

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import {Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import store from "./store"
import MainPage from './pages/MainPage'
import MenuPage from './pages/MenuPage'

const application = document.getElementById('app')

ReactDOM.render(
<Provider store={store}>
	<Router history={browserHistory}>
		<Route path="/"component={App}>
			<IndexRoute component={MenuPage} />
		</Route>
	</Router>
</Provider>, application);

 // <Route path="menu" component={MainPage} />
