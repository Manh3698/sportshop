var elementsAction = {};
jQuery(document).on('add.layers.design', function(event, li, item){
	var e = '#item-'+item.id;		
	if (typeof item.event_upload == 'undefined' || item.event_upload != 1)
	{
		jQuery(e).data('event_upload', 0);		
	}
	else
	{
		jQuery(e).data('event_upload', 1);
		var div = jQuery(li).children('.layer-action');		
		var a = div.find('a');
		if(typeof a[1] != 'undefined')
		{
			jQuery(a[1]).remove();
		}
	}	
});

jQuery(document).on('after.imports.item.design', function(event, e){
	
	var type = jQuery(e).data('type');
	if (type == 'clipart' && jQuery(e).data('event_upload') == 1)
	{
		jQuery(e).addClass('item-upload');
		jQuery('.item-upload').click(function(event){
			elementsAction = this;			
			$jd('#dg-myclipart').modal('show');
		});
	}
	else
	{
		jQuery(e).removeClass('item-upload');
	}
});

jQuery(document).on('after.create.item.design', function(event, e){
	var type = jQuery(e).data('type');
	if (type != 'clipart') return;	
	
	if (typeof elementsAction.id != 'undefined')
	{
		var o = jQuery(elementsAction);
		var elmindex = o.css('z-index');
		elmindex = parseInt(elmindex) + 1;
		jQuery(e).css({
			'left': o.css('left'),
			'top': o.css('top'),
			'transform': o.css('transform'),
			'z-index': elmindex,
		});
		jQuery(e).data('event_upload', 0);
		
		elementsAction = {};
	}
});

jQuery(document).on('myitem.create.item.design', function(event, o){
	if (typeof elementsAction != 'undefined' && typeof elementsAction.id != 'undefined')
	{
		o.width = jQuery(elementsAction).outerWidth();
		o.height = jQuery(elementsAction).outerHeight();
	}
	else
	{
		var e = jQuery('.drag-item.item-upload');
		if (e.length > 0)
		{			
			elementsAction = e[0];
			o.width = jQuery(elementsAction).outerWidth();
			o.height = jQuery(elementsAction).outerHeight();
		}
	}
});