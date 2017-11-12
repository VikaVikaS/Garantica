;(function() {
	var events = [];
	function datesOpen() {
		if($('.js-dates-open').length) {
			$('.js-dates-open').on('click', function() {
				$('.js-dates-popup').addClass('visible');
			})
		}
	} 
	function datesReset() {
		if($('.js-dates-reset').length) {
			$('.js-dates-reset').on('click', function() {
				$('.js-dates-popup').removeClass('visible');

				$('.fc-state-highlight').removeClass("fc-state-highlight");

				$('.js-dates-select').find($('select')).each(function() {
					$(this).val($(this).find('option:first-child').val());
					$(this).selectric('refresh');
				});

				events = [];

				$('.js-calendar').fullCalendar('removeEvents');
				$('.js-calendar').find('.fc-day').removeClass('active');
				$('.js-calendar-small').find('.fc-day').removeClass('last');

				console.log(events)
			})
		}
	}

	function search(nameKey, myArray) {
	    for (var i=0; i < myArray.length; i++) {
	        if (myArray[i].start === nameKey) {
	            return myArray[i];
	        }
	    }
	}

	//calendar
	function calendar() {
		if($('.js-calendar-small').length) {

			var initialLocaleCode = 'uk';
			$('.js-calendar-small').fullCalendar({
				header: {
					left: 'title,prev,next',
					right:'',
					center:''
				},
				height:240,
				editable:true,
				
				locale: initialLocaleCode,
				selectable: true,
		
				dayClick: function (date, jsEvent, view) {
					
					var eventItem = {
						start:'',
						title:''
					}
					if(!$(jsEvent.target).hasClass('fc-state-highlight')) {

						$(jsEvent.target).addClass("fc-state-highlight");

						setTimeout(function(){
							$('.fc-day').removeClass("last")
							$(jsEvent.target).addClass("last");
						});

						eventItem.start = $('.js-calendar-small .fc-day.last').data('date');
						var hoursStart = $('.js-calendar-hours-start option:selected').text(),
						    minutesStart = $('.js-calendar-minutes-start option:selected').text(),
						    hoursEnd = $('.js-calendar-hours-end option:selected').text(),
						    minutesEnd = $('.js-calendar-minutes-end option:selected').text();

						eventItem.title = ''+hoursStart+'.'+minutesStart+' - '+hoursEnd+'.'+minutesEnd+'';

						$('.js-dates-select').find($('select')).each(function() {
							$(this).find('option').prop('disabled', false);
							$(this).val($(this).find('option:first-child').val());
							$(this).selectric('refresh');
						});
						events.push(eventItem)
					
					} else {

						// var eventHistory = search($(jsEvent.target).data('date'), events);

						// var time = eventHistory.title.split('-'),
						// 	timeStart = time[0].toString().split('.'),
						// 	timeEnd = time[1].toString().split('.'),
						// 	hoursStart = timeStart[0],
						// 	minutesStart = timeStart[1], 
						// 	hoursEnd = timeEnd[0],
						// 	minutesEnd = timeEnd[1];
						
						// // var startHours = 
						// $('.js-calendar-hours-start').val(''+hoursStart+'');
						// $('.js-calendar-hours-start').selectric('refresh');

					}
			        
			   }
			});
		}
	} 

	//form submit
	function formSubmit() {
		if($('.js-dates-select').length) {
			$('.js-dates-select').submit(function(e) {
				e.preventDefault();
				var eventItem = {
						start:'',
						title:''
					}
					var hoursStart = $('.js-calendar-hours-start option:selected').text(),
						minutesStart = $('.js-calendar-minutes-start option:selected').text(),
						hoursEnd = $('.js-calendar-hours-end option:selected').text(),
						minutesEnd = $('.js-calendar-minutes-end option:selected').text();

					eventItem.start = $('.js-calendar-small .fc-day.last').data('date');
					eventItem.title = ''+hoursStart+'.'+minutesStart+' - '+hoursEnd+'.'+minutesEnd+'';

					events.push(eventItem)
				
				$('.js-calendar').fullCalendar('removeEvents');
				$('.js-calendar').fullCalendar('renderEvents', events);

				// $.ajax({
		  //           url: 'dates.json',
		  //           dataType:'JSON',
		  //           type: "POST",
		  //           cache: false,
		  //           data:JSON.stringify(events),
		  //           contentType: "application/json",
		  //       });


				
		        $('.js-dates-popup').removeClass('visible');
		        $('.js-calendar-small').find('.fc-day').removeClass('last');
			}) 
		}
	}

	function selectChange() {
		if($('.js-calendar-hours-start').length) {
			$('.js-calendar-hours-start').on('selectric-change', function() {

				var startValue = +$('.js-calendar-hours-start option:selected').text();

				$('.js-calendar-hours-end').find($('option')).each(function() {
					if(+$(this).text() < startValue) {
						$(this).prop('disabled', true);
						$('.js-calendar-hours-end').val($('.js-calendar-hours-end').find('option').not('[disabled]').val());
						$('.js-calendar-hours-end').selectric('refresh');
					} else {
						$(this).prop('disabled', false);
						$('.js-calendar-hours-end').selectric('refresh');
					}
				})
			})
		}

		if($('.js-calendar-hours-end').length) {
			$('.js-calendar-hours-end').on('selectric-change', function() {

				var startValue = +$('.js-calendar-hours-end option:selected').text();
				$('.js-calendar-hours-start').find($('option')).each(function() {
					if(+$(this).text() > startValue) {
						$(this).prop('disabled', true);
						$('.js-calendar-hours-start').selectric('refresh');
					} else {
						$(this).prop('disabled', false);
					
						$('.js-calendar-hours-start').selectric('refresh');
					}
				})
			})
		}
	}

 	selectChange();

	$(document).on('ready', function() {
		datesOpen();
		datesReset();
		calendar();
		formSubmit();
	});
}())