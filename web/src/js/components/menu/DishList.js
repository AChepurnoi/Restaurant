import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class DishList extends React.Component{

  constructor(props) {
      super(props);
      
  }
	render(){
		return <div class="row"> 
            <div class="col-md-12" onClick={this.props.onAddDish.bind(this)}> 
              <span class="btn">Add dish</span>
            </div>
            
            {this.props.items.map(
              item => <div class="col-md-4" key={item.id}>
                        <div class="panel panel-default">
                          <div class="panel-heading">
                            <h3 class="panel-title">{item.title}</h3>
                            <span class="glyphicon glyphicon-remove" onClick={this.props.onDelete.bind(this, item.id)}></span>
                          </div>
                          <div class="panel-body">
                            <div>
                              <img class="img-responsive" src={item.image}/>
                            </div>

                            <div>{item.description}</div>
                            
                          </div>
                        </div>
                      </div>)}
            
          </div>
                    
	}

}