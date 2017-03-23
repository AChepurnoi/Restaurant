import React from 'react'
import { connect } from "react-redux"



export default class MenuPage extends React.Component{

	render(){
		return <div class="content">
            <div class="content-inside">
                <div class="container-fluid">
                   <div class="row">
                        <div class="col-md-3">
                            <ul class="list-group">
                              <li class="list-group-item">Item 1</li>
                              <li class="list-group-item">Item 2</li>
                              <li class="list-group-item">Item 3</li>
                              <li class="list-group-item">Item 4</li>
                              <li class="list-group-item">Item 5</li>
                              <li class="list-group-item">Item 6</li>
                              <li class="list-group-item">Item 7</li>
                              <li class="list-group-item">Item 8</li>
                              <li class="list-group-item">Item 9</li>
                            </ul>
                        </div>

                        <div class="col-md-9">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  Panel content
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  Panel content
                                </div>
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="panel panel-default">
                                <div class="panel-heading">
                                  <h3 class="panel-title">Panel title</h3>
                                </div>
                                <div class="panel-body">
                                  Panel content
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