import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router'
import Cropper from '../../../assets/javascripts/Cropper'
import axios from 'axios'

export default class CreateCategoryModal extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	let self = this;
    	$('#category-image-holder').change(event => {
    		let file = event.target.files[0];
    		if(file == undefined) return;
    		let reader = new FileReader();	
    		reader.onload = () => self.loadImage(reader.result);
    		reader.readAsDataURL(file);
    	});
    }


    recreateImagePreview(){
    	$('#category-image-preview').remove();
    	$('.cropper-container').remove();
    	let img = $('<img />', { 
		  id: 'category-image-preview',
		  src: 'http://placehold.it/640x480',
		  width: 640,
		  height: 480,
		  class:"img-responsive"
		});
		img.appendTo($('#category-image-input-block'));
    }


    loadImage(image){
    	this.recreateImagePreview();
    	let img = $('#category-image-preview')[0];
    	img.src = image;
    	this.cropper = new Cropper(img, {
		  aspectRatio: 16 / 9
		});
    }

    addImage(){
    	$('#category-image-holder').click();
    }
    
    getImageBlob(){
    	let cropper = this.cropper;
    	return new Promise((resolve, reject) => cropper.getCroppedCanvas().toBlob(blob => resolve(blob)));
    }

    onSave(){
    	let title = $('#category-title').val();
    	let self = this;
    	self.getImageBlob()
    		.then(image => self.props.onSavePressed({title,image}));
		
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
				        <form id="category-modal-form">
							<div class="form-group">
								<label for="category-title">Title</label>
							  <input id="category-title" type="text" class="form-control" placeholder="Category name" aria-describedby="basic-addon1"/>
							</div>

							<div id="category-image-input-block" class="form-group">
								<div class="btn" onClick={this.addImage.bind(this)}>Select image </div>
								<input id="category-image-holder" type="file" class="hide"/>
								<img id="category-image-preview" class="img-responsive" height="480" width="640" src="http://placehold.it/640x480"/>
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


