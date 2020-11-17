/**
* Description: trigger when "after.create.item.design" for
* add button crop image in control panel upload image
*/

// jQuery(document).on('draggable',"#dag-files-images img", function(){
//  	revert: "invalid",
//     refreshPositions: true,
//     drag: function (event, ui) {
// 	console.log(ui);
//         ui.helper.addClass("draggable");
//     },
//     stop: function (event, ui) {
//         ui.helper.removeClass("draggable");
//         //var image = this.src.split("/")[this.src.split("/").length - 1];
        
//     }
// });

jQuery(document).on( "after.create.item.design", function(event, span){
	// jQuery('#dag-files-images img').draggable();
	var item        = span.item;
	var designImage = design.item.get().find('image')[0];
	var cropLink = jQuery('#options-add_item_clipart').find('#crop-link-pop');

	
	//jQuery('#crop-link-pop').show();
	// alert('1');
	jQuery(designImage).data('originImgCropURL', item.url);
	// jQuery('#crop-link-pop').trigger('click');
		// setTimeout(function () {
  //  			jQuery('#cropAction').trigger('click');
		// }, 1000);
	
});

/**
* Description: method set flg proportion of design image
*/
jQuery(document).on( "resize.item.design", function(event, ui){
 	var design_image = design.item.get().find('image')[0];
	if(design.item.get().find('image') == 0) 
	{
		if(jQuery('#clipart-lock').prop('checked')) 
		{
			design_image.setAttribute('proportion', 1);
		}
	}
});

/**
* Description: trigger when "select.item.design" for 
* display and remove button crop image
*/
 jQuery(document).on("select.item.design", function( event, e ){
 	var cropLink = jQuery('#options-add_item_clipart').find('#crop-link-pop');
 	if(jQuery(e).data('type') == 'clipart')
 	{
 		var file = jQuery(e).data('file');
 		if(file.type != 'image')
 		{	
 			jQuery(cropLink).hide();
			jQuery('#crop-link-smp').hide();
 		}
		else
		{
 			jQuery(cropLink).show();
			jQuery('#crop-link-smp').show();
			if(jQuery('.dg-options-toolbar').css('display') == 'none') 
			{
				jQuery('#crop-link-pop').show();
			}
			else
			{
				jQuery('#crop-link-pop').hide();
			}
 		}
 	}
 });

/**
* Description: Method init
*/
 jQuery(document).ready(function () {
	var cropLink = jQuery('#options-add_item_clipart').find('#crop-link-pop');
	if(cropLink.length == 0) 
	{
		var cropActionLabel = jQuery('#cropActionLabel').val();
		jQuery('#options-add_item_clipart .dg-options-content')
			.append('<button type=\'button\' id=\'crop-link-pop\' class=\'btn btn-default btn-sm\' aria-label=\'Left Align\' onclick=\'showCropPop()\'><i class=\'fa fa-crop\'></i> '+ cropActionLabel +'</button>');
		jQuery('#options-add_item_clipart .btn-group')
			.append('<button id="crop-link-smp" class="btn btn-default" type="button" data-type="crop" onclick="showCropPop()"><i class="fa fa-crop"></i> <small class="clearfix">'+ cropActionLabel +'</small></button>');
	}
	jQuery('#mask_select').draggable({
		containment: 'parent',
		drag: function(event, ui) {
			// console.log(ui);
			jQuery('#select_crop').css({
				'top' : (ui.position.top ) + 'px',
				'left': (ui.position.left) + 'px'
			});
			jQuery('#image_crop').css({
				'top' : -(ui.position.top) + 'px',
				'left': -(ui.position.left) + 'px'
			});
		}
	}).resizable({
		containment: 'parent',
		aspectRatio: true,
		handles: 'se',
		minHeight: 100,
		resize: function(event, ui) {
			// console.log(ui.size.width);
			jQuery('#select_crop').css({
				'width' : ui.size.width  + 'px',
				'height': ui.size.height  + 'px'
			});
		}
	});
	
	jQuery('#cropAction').click(function() {
		var width     = jQuery('#select_crop').width();
		var height    = jQuery('#select_crop').height();
		var offset_X  = jQuery('#select_crop').position().left;
		var offset_Y  = jQuery('#select_crop').position().top;
		var cropLink  = jQuery('#targetImage').attr('src');
		var cropSrc   = cropLink.split('/').pop();
		var img_des   = design.item.get().find('image')[0];
		//console.log(img_des);
		var src_link  = img_des.getAttribute('xlink:href');
		var scrArr    = src_link.split('/');
		var src_image = scrArr.pop();
		var fileTmp   = src_image.split('.');
		jQuery('#cropAction').button('loading');
		scrArr.pop();
		var monthFol = scrArr.pop();
		var yearFol  = scrArr.pop();
		var img      = new Image();
		img.onload   = function() {
			var size = jQuery('#image_wraper').width();
			var zoom = img.width/size;
			var dst_x = 0;
			var dst_y = 0;
			var src_x = offset_X * zoom;
			var src_y = offset_Y * zoom;
			var dst_w = width * zoom;
			var dst_h = height * zoom;
			var src_w = width * zoom;
			var src_h = height * zoom;
			jQuery.ajax({
				url : siteURL + 'ajax.php?type=addon&task=crop-image',
				type: 'POST',
				data: 
				{
					'imageNm'  : fileTmp[0],
					'src_image': cropSrc,
					'dst_x'    : dst_x,
					'dst_y'    : dst_y,
					'src_x'    : src_x,
					'src_y'    : src_y,
					'dst_w'    : dst_w,
					'dst_h'    : dst_h,
					'src_w'    : src_w,
					'src_h'    : src_h,
					'monthFol' : monthFol,
					'yearFol'  : yearFol,
					'imageType': fileTmp[1].toLowerCase()
				},
				dataType: 'json'
			}).done(function(content){
				if(content.status == 0)
				{
					alert(content.message);
					return false;
				}
				var image = new Image();
				image.onload = function() {
					img_des.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', image.src);
					jQuery('#cropAction').button('reset');
					jQuery(document).triggerHandler( "aftercrop.image.design", design.item.get()[0]);
					jQuery('#cropModal').modal('hide'); 
				}
				var src = img_des.getAttribute('xlink:href').split('/');
				var f   = src.pop();
				image.src = src.join('/') + '/' + content.data;
			});
		};
		img.src = cropLink;
	});
	
	jQuery('#loadOriginImageCrop').click(function() {
		var designImage = design.item.get().find('image')[0];
		var url = jQuery(designImage).data('originImgCropURL');
		jQuery('#targetImage').attr('src', url);
		jQuery('#image_crop').attr('src', url);
	});
	
	jQuery('#mask_select').resizable().on('resize', function (e) {
    	e.stopPropagation();
	});
 });
 
/**
* Description: action responsive for mobie
*/
function showCropPop() {
	var designImage = design.item.get().find('image')[0];
	var urlImage    = designImage.getAttribute('xlink:href');
	var realImg     = new Image();
	realImg.src     = urlImage;
	jQuery('#cropModal').modal('show');	
	
	realImg.onload = function() {

		jQuery('#targetImage').attr('src', urlImage);
		jQuery('#image_crop').attr('src', urlImage);
		var size_height = 380;
		var zoom        = realImg.width / realImg.height;
		var size_width      = size_height * zoom;
		var size_modal  = jQuery('#cropModal').find('.modal-dialog').width();
		if(size_modal == 900) {
			size_modal = 670;
		}
		else if(size_modal == 600) 
		{
			size_modal = 560;
		} 
		else if(size_modal == 0) 
		{
			size_modal = jQuery('#cropModal').width() - 60;
		}
		if(size_width > size_modal) 
		{
			size_width = size_modal;
		}
		responsesive(size_width, zoom);
		if (jQuery('#mask_select .item-mask-move').length == 0)
		{
			jQuery('#mask_select').append('<div class="item-mask-move fa fa fa-arrows"></div>');
		}
	}
	jQuery('.khoibaongoai').hide();
	jQuery('#loadOriginImageCrop').trigger('click');
}

/**
* Description: method responsesive for other device
*/
function responsesive(size_width, zoom) {
	var selectArea   = jQuery('#select_crop');
	var imageArea    = jQuery('#image_crop');
	var targetImage  = jQuery('#targetImage');
	var mask_select  = jQuery('#mask_select');
	var design_image = design.item.get().find('image')[0];
	var img_ratio    = design_image.getAttribute('width') / design_image.getAttribute('height');
	// console.log(img_ratio);
	var width        = size_width ;
	var height       = width / img_ratio;
	var zoo          = targetImage.width() / size_width;
	var off_x;
	var off_y;
	if(height > size_width / zoom) 
	{
		height = size_width / zoom;
		width  = height * img_ratio;
	}
	jQuery('#image_wraper').width(size_width);
	jQuery('#image_wraper').height(Math.round(size_width / zoom));
	jQuery('#image_wraper .mask_div').width(size_width);
	jQuery('#image_wraper .mask_div').height(Math.round(size_width / zoom));
	targetImage.width(Math.round(size_width));
	targetImage.height(Math.round(size_width / zoom));
	imageArea.width(Math.round(size_width));
	imageArea.height(Math.round(size_width / zoom));
	if(design_image.getAttribute('proportion') == 1) 
	{
		var w     = selectArea.width();
		var y     = selectArea.height();
		var img_h = targetImage.height();
		var n_w = w;
		var n_h = n_w / img_ratio;
		if(parseInt(n_h) + parseInt(y) > img_h) 
		{
			n_h = img_h - y;
			n_w = n_h * img_ratio;
		}
		selectArea.width(n_w / zoo);
		selectArea.height(n_h / zoo);
		mask_select.width(n_w / zoo);
		mask_select.height(n_h / zoo);
	}
	else
	{
		selectArea.width(width);
		selectArea.height(height);
		mask_select.width(width);
		mask_select.height(height);
	}
	off_x = Math.round(size_width * 0.1);
	off_y = Math.round(size_width / zoom * 0.1);
	selectArea.css({
		'top' : 0 + 'px',
		'left': 0 + 'px'
	});
	mask_select.css({
		'top' : (0 ) + 'px',
		'left': (0 ) + 'px'
	});
	imageArea.css({
		'top' : -(0) + 'px',
		'left': -(0) + 'px'
	});
}