
function truncation(list, inner, item, button) {
	$(list).each(function() {
		var numItems = $(this).find(item).length,
			listHeight = $(this).height(),
			itemHeight = $(this).find(item).outerHeight(true),
			setListHeight = (itemHeight * 10) + 10;

		if (numItems > 10) {
			var that = this;

			$(this).find(inner).css({
				'overflow': 'hidden',
				'height': setListHeight,
				'box-shadow': 'inset 0 -7px 10px -10px rgba(0,0,0,.5)'
			});

			$(this).find(inner).after('<div class="filter-show-more" style="text-decoration: none;">+ Show more</div>');

			$(this).find(button).click(function() {
				$(that).find(inner).css({
					"box-shadow": "none"
				});
				$(that).find(inner).animate({
					"height": listHeight
				}, 250);
				$(this).hide();
			});
		};
	});
};

truncation(
	'.filter-attribute-list',
	'.filter-attribute-list-inner',
	'.filter-attribute-item',
	'.filter-show-more'
);