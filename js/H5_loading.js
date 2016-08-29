var H5_loading = function (images, firstPage) {
	if (this._images === undefined) {
		this._images = (images || []).length;
		this._load = 0;

		var id = this.id;
		window[id] = this;

		for(s in images){
			var item = images[s];
			var img = new Image;
			img.onLoad = function(){
				window[id].loader();
			}
			img.src = item;
		}
		$('#rate').text('0%');
		return this;
	}else{
		this._loaded ++;
		$('#rate').text((this._loaded / this._images * 100 >> 0) + '%');
		if (this._loaded < this._images) {

			return this;
		}
	}
	window[id] = null;
	
	this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
					$(this).find('.h5_component').trigger('onLeave');
				},
			afterLoad: function(anchorLink, index) {
					$(this).find('.h5_component').trigger('onLoad');
				}
		});
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		if (firstPage) {
			$.fn.fullpage.moveTo(firstPage);
		}
}