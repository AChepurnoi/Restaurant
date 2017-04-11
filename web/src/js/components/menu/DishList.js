import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class DishList extends React.Component{

    constructor(props) {
        super(props);
      
    }
	render(){

        let addBtn;
        let delBtn = (id) => {}
        let admin = this.props.auth.authorized? (this.props.auth.user ? this.props.auth.user.admin : false) : false;
        
        if(admin){
            addBtn = <div class="col-md-12" onClick={this.props.onAddDish.bind(this)}> 
                         <span class="btn">Add dish</span>
                     </div>

            delBtn = (id) => <span class="glyphicon glyphicon-remove" onClick={this.props.onDelete.bind(this, id)}></span>
                
        }

		return <div class="row"> 
                {addBtn}
                {this.props.items.map(
                  item => <div class="col-md-4" key={item.id}>
                            <div class="panel panel-default">
                              <div class="panel-heading">
                                <h3 class="panel-title">{item.title}</h3>
                                 {delBtn(item.id)}
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