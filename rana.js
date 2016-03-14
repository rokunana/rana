/*
 * rana.js 1.0.0
 *
 * rokunana Inc. <http://rokunana.com/>
 * Copyright 2016, Apache License Version 2.0
 *
 */

(function($){
	"use strict";


	$(function(){

		$('[class*="RANA_"]').each(function(){

			var $parent = $(this);
			var className = null;
			var classList = this.className.split(/\s+/);
			$.each(classList, function(index, item) {
				if (item.indexOf('RANA_') !== -1) {
					var name = item.split('_');
					if(name.length === 2) {
						className = name;
						return false;
					}
				}
			});

			if(className){
				// セレクタの指定がない場合はaタグ
				var target = $parent.data('trackingtarget') || 'a';

				$parent.on('click', target, function(e){
					var index = $parent.find(target).index(this);
					var indexStr = ('00'+(index+1)).slice(-3);

					// gaがなければ送信しない
					if(!ga) return;

					var label = this.tagName === 'A' ? this.attributes.href.value : '';

					ga('send', {
						hitType: 'event',
						eventCategory: 'AnchorClick@'+location.pathname,
						eventAction: className[1]+'_'+indexStr,
						eventLabel: label
					});
				});
			}

		});

	});


})(jQuery);