import React from 'react'
import { connect } from "react-redux"
import CategoryListComponent from "../components/menu/CategoryListComponent"
import DishListComponent from "../components/menu/DishListComponent"

export default class MenuPage extends React.Component{


	render(){
		return <div class="content">

            <div class="content-inside">
                <div class="container-fluid">
                   <div class="row top-padded">
                        <div class="col-md-3">
                            <CategoryListComponent/>
                        </div>

                        <div class="col-md-9">
                            <DishListComponent/>
                        </div>
                   </div>
                </div>
            </div>
        </div>
	}

}