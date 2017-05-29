import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'


export default class DishList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            limit: 3,
            offset: 0
        }
      
    }

    
	render(){


        let addBtn;
        let delBtn = (id) => {};
        let editDiscount = (id) => {};
        let addCartBtn = (id) => {};
        
        if(this.props.admin){
            addBtn = <div class="col-md-12">
                        <div class="btn btn-default dish-add-btn" onClick={this.props.onAddDish.bind(this)}>Add dish</div>
                     </div>
            editDiscount = (id) => <span class="glyphicon glyphicon-usd item-icon discount" onClick={this.props.onEditDiscount.bind(this, id)}></span>
            delBtn = (id) => <span class="glyphicon glyphicon-remove item-icon delete" onClick={this.props.onDelete.bind(this, id)}></span>
         
            addCartBtn = (id) => <span class="glyphicon glyphicon-shopping-cart item-icon cart" onClick={this.props.onAddToCart.bind(this, id)}></span>


        }

        let nextPage =  <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next"
                               onClick={() => this.setState({offset: this.state.offset + 3})}>
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>;

        let prevPage =  <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous"
                               onClick={() => this.setState({offset: this.state.offset - 3})}>
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>;


		return <div class="row"> 
                <div class="dish-container col-xs-12">
                {addBtn}
                {this.props.items.map(
                  (item, i) => (
                          <div class="col-sm-4" key={item.id}>
                            <div class="panel panel-default">
                              <div class="panel-heading">
                                <div class="row">
                                 <div class="col-xs-7 col-lg-8">
                                    <h3 class="panel-title">{item.title}</h3>
                                 </div>
                                 <div class="col-xs-1">
                                    {delBtn(item.id)}
                                 </div>
                                 <div class="col-xs-1">
                                    {editDiscount(item.id)}
                                 </div>
                                 <div class="col-xs-1">
                                    {addCartBtn(item.id)}
                                 </div>
                                </div>
                              </div>
                              {item.sale ? "":<span class="label label-primary label-price">{item.price}$</span>}
                              {item.sale ? <span class="label label-primary label-price"><del>{item.price}$</del></span> : ""}
                              {item.sale ? <span class="label label-warning label-sale">On sale</span> : ""}
                              {item.discount ? <span class="label label-warning label-discount">{item.price - item.price * (item.discount / 100)}</span> : ""}

                               <div class="panel-image">
                                  <img class="panel-image" src={item.image}/>
                                </div>
                              <div class="panel-body">
                                <div class="panel-content">{item.description}</div>
                              </div>
                            </div>
                           </div>)).slice(this.state.offset, this.state.offset + this.state.limit)}
                </div>
                <nav aria-label="Page navigation example" className="text-center">
                    <ul class="pagination">
                        {this.state.offset > 0 && prevPage}
                        <li class="page-item"><a class="page-link" href="#">{(this.state.offset / 3) + 1}</a></li>
                        {this.state.offset + 3 < this.props.items.length && nextPage}
                    </ul>
                </nav>
              </div>
                    
	}


}