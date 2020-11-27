(function () {
	var dragged, mousex, mousey, coordinates = [];
	var filesUpload = document.getElementById("files-upload"),
		dropArea 	= document.getElementById("drop-area"),
		fileList 	= document.getElementById("dag-files-images"),
		fileType 	= ["png", "gif", "jpg", "jpeg"],
		maxsize		= uploadSize['max'];
		minsize		= uploadSize['min'];



var continueDragging = function(e) {
    // Change the location of the draggable object
    dragged.css({
        "left": e.pageX - (dragged.width() / 2),
        "top": e.pageY - (dragged.height() / 2)
    });

    // Check if we hit any boxes
    for (var i in coordinates) {
        if (mousex >= coordinates[i].left && mousex <= coordinates[i].right) {
            if (mousey >= coordinates[i].top && mousey <= coordinates[i].bottom) {
                // Yes, the mouse is on a droppable area
                // Lets change the background color
                coordinates[i].dom.addClass("somethingover");
            }
        } else {
            // Nope, we did not hit any objects yet
            coordinates[i].dom.removeClass("somethingover");
        }
    }

    // Keep the last positions of the mouse coord.s
    mousex = e.pageX;
    mousey = e.pageY;
}



// Start the dragging
var startDragging = function(e) {
    // Find coordinates of the droppable bounding boxes
    jQuery(".clickvaodechinhsua").each(function() {
        var lefttop = jQuery(this).offset();
        // and save them in a container for later access
        coordinates.push({
            dom: $(this),
            left: lefttop.left,
            top: lefttop.top,
            right: lefttop.left + jQuery(this).width(),
            bottom: lefttop.top + jQuery(this).height()
        });
    });

    // When the mouse down event is received
    if (e.type == "mousedown") {
        dragged = jQuery(this);
        // Change the position of the draggable
        dragged.css({
            "left": e.pageX - (dragged.width() / 2),
            "top": e.pageY - (dragged.height() / 2),
            "position": "absolute"
        });
        // Bind the events for dragging and stopping
        jQuery(document).bind("mousemove", continueDragging);
        jQuery(document).bind("mouseup", endDragging);
    }
}

// Start the dragging
jQuery(".hinhanhdeclick").bind("mousedown", startDragging);


	function uploadFile (file) {
		numFiles = jQuery("#files-upload")[0].files.length;
		// alert(numFiles);
		var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
		ext = ext.toLowerCase();
		var check = fileType.indexOf(ext);//alert(file.type);		
		if(check == -1)
		{
			alert(lang.upload.fileType);
			return false;
		}

		if(file.size > 999999999999999999999999 * maxsize){	//1048576 = 1MB
			alert(lang.upload.maxSize + maxsize+'MB)');
			alert(maxsize);
			return false;
		}
		
		if(file.size < 1048576 * minsize){
			alert(lang.upload.minSize + minsize+'MB)');
			return false;
		}
		var span = document.createElement("span"),			
			img,
			progressBarContainer = document.createElement("div"),
			progressBar = document.createElement("div"),
			reader,
			xhr,
			fileInfo;
		span.className = 'view-thumb hinhanhdeclick';
		//var idUser = jQuery('#iduser').val();
		// alert(idUser);
		if (jQuery('#remove-bg').is(':checked') == true) var remove = 1;
		else var remove = 0;
		var url = siteURL + 'ajax.php?type=upload&remove='+remove;
		
		/*
			If the file is an image and the web browser supports FileReader,
			present a preview in the file list
		*/
	
		if (typeof window.FileReader !== "undefined" && (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif')) {
			
			img = document.createElement("img");
			img.className = 'img-responsive img-thumbnail ui-draggable';

			span.appendChild(img);
			// console.log(span);
			jQuery(span).draggable({
                revert: "invalid",

                refreshPositions: true,
                start  : function(event, ui){
			        jQuery(ui.helper).addClass("ui-helper");
			    },
                drag: function (event, ui) {
                    ui.helper.addClass("draggable");
                },
                stop: function (event, ui) {
                    ui.helper.removeClass("draggable");
                   
                }
            }).resizable();
			// jQuery(span).bind("mousedown", startDragging);
             jQuery(".clickvaodechinhsua").droppable({
             	revert: "invalid",
             	hoverClass: "hoverquathimaudo",
                drop: function (event, ui) {
                	jQuery('#'+jQuery(this).attr('datafor')).trigger('click');
                	ui.draggable.trigger('click');
                	var temp = span;
                	span.remove();
                	//jQuery(temp).removeAttr('style');
                	//console.log(temp);
                	//jQuery('#dag-files-images').append(temp);
                	//alert(jQuery(this).attr('layer'));
                }
            });			

            // jQuery(span).last().trigger('click');
            // console.log(img);


			reader = new FileReader();
			
			reader.onload = (function (theImg) {

				return function (evt) {
					theImg.src = evt.target.result;
					if (/MSIE/.test(navigator.userAgent))
					{
						jQuery(progressBar).html('uploading...').css('width', '100%');
						jQuery.ajax({
							type: "POST",
							url:  siteURL + 'ajax.php?type=uploadIE&remove='+remove,
							data: { myfile: evt.target.result}
						}).done(function( content ) {	

							var media 	= eval('('+content+')');
							if (media.status == 1)
							{
								// console.log(media);
								img.setAttribute('src', siteURL + media.src);
								span.item = media.item;
								span.item.url = siteURL + media.item.url;
								span.item.thumb = siteURL + media.item.thumb;
								// jQuery(".hinhanhdeclick ")
								jQuery(span).bind('click', function(){
									design.myart.create(span);
									
									setTimeout(function(){
										var elm = design.item.get();
										jQuery(elm).addClass('drag-item-upload');
										jQuery(elm).data('upload', 1);
										design.ajax.getPrice();
									}, 100);
								});
								//span.last().trigger('click');
								//console.log(span);
								jQuery('#dag-files-images img').draggable();
								// alert('1');
								jQuery(progressBarContainer).addClass('uploaded');
								jQuery(progressBar).html('Uploaded').css('width', '100%');
								
							}
							else
							{
								alert(media.msg);
							}
							// jQuery('#upload-copyright').attr('checked', true);
							jQuery('#remove-bg').attr('checked', false);
							jQuery('#files-upload').val('');
						});
					}
				};
			}(img));
			

			reader.readAsDataURL(file);
			
		}
		else
		{
			img = document.createElement("img");
			img.className = 'img-responsive img-thumbnail ui-draggable';
			img.setAttribute('src', siteURL + 'assets/images/photo.png');
			span.appendChild(img);
			// img.trigger('click');
		}
		
		// jQuery('#upload-tabs a[href="#uploaded-art"]').tab('show');
		
		// progressBarContainer.className = "progress progress-bar-container";
		// progressBar.className = "progress-bar";
		// progressBarContainer.appendChild(progressBar);
		// span.appendChild(progressBarContainer);
		
		// Uploading - for Firefox, Google Chrome and Safari
		xhr = new XMLHttpRequest();
		
		// Update progress bar
		xhr.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable) {
				var completed = (evt.loaded / evt.total) * 100;
				progressBar.style.width = completed + '%';
				progressBar.innerHTML = completed.toFixed(0) + '%';
			}
			else {
				// No data to calculate on
			}
		}, false);
			
		
		// File uploaded
		xhr.addEventListener("load", function () {
			progressBarContainer.className += " uploaded";
			progressBar.innerHTML = "Uploaded!";			
		}, false);		
		
		if (/MSIE/.test(navigator.userAgent) == false)
		{
			xhr.open("post", url, true);
			
			xhr.onload = function() {
				if (xhr.status === 200) {
					var media 					= eval('('+this.responseText+')');
					if (media.status == 1)
					{
						img.setAttribute('src', siteURL + media.src);
						span.item = media.item;
						span.item.url = siteURL + media.item.url;
						span.item.thumb = siteURL + media.item.thumb;
						jQuery(span).bind('click', function(){
							

							design.myart.create(span);
							
							setTimeout(function(){
								var elm = design.item.get();
								jQuery(elm).addClass('drag-item-upload');
								jQuery(elm).data('upload', 1);
								//design.ajax.getPrice();
							}, 1000);
						});
					}
					else
					{
						alert(media.msg)
					}
				}
				jQuery('#upload-copyright').attr('checked', true);
				jQuery('#remove-bg').attr('checked', false);
				jQuery('#files-upload').val('');
			};
			
			var formData = new FormData();  
			formData.append('myfile', file); 
			xhr.send(formData);
		}
		jQuery('#dg-myclipart').modal('hide');
		 //jQuery('#dg-myclipart').modal('toggle');
		 // alert('1');
		fileList.appendChild(span);
		var checkUp = jQuery('#txtCheckUpload').val();
		// alert(checkUp);
		setTimeout(function(){
		  if(checkUp!=0){
		  	jQuery(span).last().trigger('click');
		  }
		}, 2000);

		jQuery(span).draggable({
            revert: "invalid",

            refreshPositions: true,
            drag: function (event, ui) {
                ui.helper.addClass("draggable");
            },
            stop: function (event, ui) {
                ui.helper.removeClass("draggable");
               
            }
        });
		// jQuery(span).bind("mousedown", startDragging);
         jQuery(".clickvaodechinhsua").droppable({
         	revert: "invalid",
         	hoverClass: "hoverquathimaudo",
            drop: function (event, ui) {
            	// console.log(ui.draggable[0]);
            	jQuery('#'+jQuery(this).attr('datafor')).trigger('click');
            	ui.draggable.trigger('click');
            	var temp = ui.draggable[0];
            	ui.draggable[0].remove();
            	jQuery(temp).removeAttr('style');
            	//console.log(temp);
            	jQuery('#dag-files-images').append(temp);
            	//alert(jQuery(this).attr('layer'));
            }
        });		

	}
	
	function traverseFiles (files) {
		if (typeof files !== "undefined") {
			for (var i=0, l=files.length; i<l; i++) {
				uploadFile(files[i]);
			}
		}
		else {
			fileList.innerHTML = "No support for the File API in this web browser";
		}	
	}
	
	// document.getElementById('action-upload').addEventListener("click", function () {
	// 	var check = design.upload.computer();
	// 	if (check == true) traverseFiles(filesUpload.files);
	// }, false);
	
	// dropArea.addEventListener("dragleave", function (evt) {
	// 	var target = evt.target;
		
	// 	if (target && target === dropArea) {
	// 		this.className = "";
	// 	}
	// 	evt.preventDefault();
	// 	evt.stopPropagation();
	// }, false);
	
	// dropArea.addEventListener("dragenter", function (evt) {
	// 	this.className = "over";
	// 	evt.preventDefault();
	// 	evt.stopPropagation();
	// }, false);
	
	// dropArea.addEventListener("dragover", function (evt) {
	// 	evt.preventDefault();
	// 	evt.stopPropagation();
	// }, false);
	
	// dropArea.addEventListener("drop", function (evt) {
	// 	traverseFiles(evt.dataTransfer.files);
	// 	this.className = "";
	// 	evt.preventDefault();
	// 	evt.stopPropagation();
	// }, false);										
})();