;(function() {
	//timer script
	function timer() {
		if($('.js-timer').length) {
			$('.js-timer').each(function() {
				var datesValue = $(this).attr('data-time');
				$(this).countdown({
					date:datesValue,
					day: 'День',
					days: 'Дня',
					hour: 'година',
					hours: 'години',
					minute: 'хвилина',
					minutes: 'хвилин',
					second: 'секунда',
					seconds: 'секунд'

				});

			})
		}
	}
	
	//running youtube video
	function youtubeVieo() {
		if($('.js-youtube-video-btn').length) {
			$('.js-youtube-video-btn').on('click', function() {
				var self = $(this),
					video = self.closest($('.js-youtube-video')).find($('iframe')),
					src = video.data('src');

				setTimeout( function() {
					self.closest($('.js-youtube-video')).addClass('hidden');
				}, 600);
				
				video.attr('src', 'https://www.youtube.com/embed/'+src+'?autoplay=1');
				
			})
		}
	}	

	//init map in popup
	function initMap() {
		if($('#js-map').length) {
			var mapCenter = {lat: 50.450412, lng: 30.523487};
			var map = new google.maps.Map(document.getElementById('js-map'), {
	          zoom: 16,
	          center: mapCenter
	        });

	        var marker = new google.maps.Marker({
			    position: mapCenter,
			    map: map
			});


	        google.maps.event.addDomListener(window, "resize", function() {
			 	var center = map.getCenter();
			 	google.maps.event.trigger(map, "resize");
			 	map.setCenter(center); 
			});
		}
	}

	$(document).on('ready', function() {
		timer();
		youtubeVieo();
		initMap();
	});
}()) 