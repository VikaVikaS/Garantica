;(function() {

	function timer() {
		if($('.js-timer').length) {
			$('.js-timer').each(function() {
				var datesValue = $(this).attr('data-time');
				$(this).countdown({
					date:datesValue,
					day: 'Дня',
					days: 'Днів',
					hour: 'Година',
					hours: 'Годин',
					minute: 'Хвилина',
					minutes: 'Хвилин',
					second: 'Секунда',
					seconds: 'Секунди'

				});
			})
		}
	}
	timer();	

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
	youtubeVieo();
}()) 