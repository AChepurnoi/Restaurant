import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class CreateDishModal extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	let self = this;
    	$('#dish-image-holder').change(event => {
    		let file = event.target.files[0];
    		if(file == undefined) return;
    		let reader = new FileReader();	
    		reader.onload = () => self.loadImage(reader.result);
    		reader.readAsDataURL(file);
    	});
    }


    recreateImagePreview(){
    	$('#dish-image-preview').remove();
    	$('.cropper-container').remove();
    	let img = $('<img />', { 
		  id: 'dish-image-preview',
		  src: 'http://placehold.it/640x480',
		  width: 640,
		  height: 480,
		  class:"img-responsive"
		});
		img.appendTo($('#dish-image-input-block'));
    }


    loadImage(image){
    	this.recreateImagePreview();
    	let img = $('#dish-image-preview')[0];
    	img.src = image;
    	this.cropper = new Cropper(img, {
		  aspectRatio: 16 / 9
		});
    }

    addImage(){
    	$('#dish-image-holder').click();
    }
    
    getImageBlob(){
    	let cropper = this.cropper;
    	return new Promise((resolve, reject) => cropper.getCroppedCanvas().toBlob(blob => resolve(blob)));
    }

    onSave(){
    	console.log(this);
    	let title = $('#dish-title').val();
    	let description = $('#dish-description').val();
    	let categoryId = $('#dish-categoryId').val();
    	let price = $('#dish-price').val();
    	let self = this;
    	self.getImageBlob()
    		.then(image => self.props.onSavePressed({title, description, categoryId, image, price}));
		
    }


	render(){
		return <div id={this.props.modalId} class="modal fade" tabIndex="-1" role="dialog">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">Create category</h4>
				      </div>
				      <div class="modal-body">
				        <form id="dish-modal-form">
							<div class="input-group">
							  <input id="dish-title" type="text" class="form-control" placeholder="Dish title" aria-describedby="basic-addon1"/>
							</div>
							
							<div class="input-group">
							  <input id="dish-description" type="text" class="form-control" placeholder="Dish description" aria-describedby="basic-addon1"/>
							</div>

							<div class="input-group">
							  <input id="dish-price" type="text" class="form-control" placeholder="Dish price" aria-describedby="basic-addon1"/>
							</div>

							<div class="input-group">
							  <label for="exampleSelect1">Category select</label>
							  <select id="dish-categoryId">
							    {this.props.categories.map( c => <option key={c.id} value={c.id}>{c.title}</option>)}
							  </select>
							</div>


							<div id="dish-image-input-block" class="input-group">
								<div class="btn" onClick={this.addImage.bind(this)}>Select image </div>
								<input id="dish-image-holder" type="file" class="hide"/>
								<img id="dish-image-preview" class="img-responsive" height="480" width="640" src="http://placehold.it/640x480"/>
							</div>

				        </form>

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button type="button" class="btn btn-primary" onClick={this.onSave.bind(this)}>Save changes</button>
				      </div>
				    </div>
				  </div>
				</div>
				                    
	}

}


