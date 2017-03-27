import React from 'react'
import { connect } from "react-redux"
import CategoryListComponent from "../components/menu/CategoryListComponent"


export default class MenuPage extends React.Component{


  

	render(){
		return <div class="content">
            <div class="content-inside">
                <div class="container-fluid">
                   <div class="row">
                        <div class="col-md-3">
                            <CategoryListComponent/>
                        </div>

                        <div class="col-md-9">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  <div>
                                    <img class="img-responsive" src="http://placehold.it/320x180"/>
                                  </div>

                                  <div>Panel content</div>
                                  
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  <div>
                                    <img class="img-responsive" src="http://placehold.it/320x180"/>
                                  </div>

                                  <div>Panel content</div>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  <div>
                                    <img class="img-responsive" src="http://placehold.it/320x180"/>
                                  </div>

                                  <div>Panel content</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
	}

}