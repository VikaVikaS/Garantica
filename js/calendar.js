;(function() {
	var events = [];
	var dates = [];
	function datesOpen() {
		if($('.js-dates-open').length) {
			$('.js-dates-open').on('click', function() {
				$('.js-dates-popup').addClass('visible');
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
	function mainCalendar() {
		if($('.js-calendar').length) {
			var initialLocaleCode = 'uk';
			$('.js-calendar').fullCalendar({
				header: {
					left: 'title, prev,next',
					right:'',
					center:''
				},
				eventsSources: [
					{
						url: 'dates.json',
						editable: false
					}
				],
				height:550,
				editable: false,
				dayNamesShort:['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'],
				locale: initialLocaleCode,
				eventRender: function (event, element, view) { 
			        var dateString = moment(event.start).format('YYYY-MM-DD');
			        $('.js-calendar').find('.fc-day[data-date="' + dateString + '"]').addClass('active');
			        
			     },
			     viewRender: function ( view ){  
			     	var totalTitle = view.title.split(" "),   
				    	month = totalTitle[0],
				    	year = totalTitle[1];

				    $('.js-calendar').find($('.fc-left h2')).html('<span>'+month+'</span><span class="fc-custom-year">'+year+'</span>');
			     }
			});
		}
	}
	mainCalendar();
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
				editable:false,
				locale: initialLocaleCode,
				selectable: true,
				dayClick: function (date, jsEvent, view) {
					if(!$(jsEvent.target).hasClass('fc-state-highlight')) {
						$('.js-choose-date').removeClass('disabled').text('обрати час');

						$(jsEvent.target).addClass("fc-state-highlight current");

						var date = $(jsEvent.target).data('date');
						dates.push(date)
					
					} else {
						$('.js-choose-date').removeClass('disabled').text('обрати час');
						$(jsEvent.target).addClass('current');
						var eventHistory = search($(jsEvent.target).data('date'), events);

						if(eventHistory != undefined) { 
							var time = eventHistory.title.split('-'),
								timeStart = time[0].toString().split('.'),
								timeEnd = time[1].toString().split('.'),
								hoursStart = timeStart[0],
								minutesStart = timeStart[1], 
								hoursEnd = timeEnd[0],
								minutesEnd = timeEnd[1];

							function valueOf(obj, prop) {
								var val = $(obj + " option").filter(function() {
								    return this.text.trim() == prop.trim()
								}).val();
								return val;
							}	
							$('.js-calendar-hours-start').val(''+valueOf(".js-calendar-hours-start", hoursStart)+'');
							$('.js-calendar-hours-start').selectric('refresh');

							$('.js-calendar-minutes-start').val(''+valueOf(".js-calendar-minutes-start", minutesStart)+'');
							$('.js-calendar-minutes-start').selectric('refresh');

							$('.js-calendar-hours-end').val(''+valueOf(".js-calendar-hours-end", hoursEnd)+'');
							$('.js-calendar-hours-end').selectric('refresh');

							$('.js-calendar-minutes-end').val(''+valueOf(".js-calendar-minutes-end", minutesEnd)+'');
							$('.js-calendar-minutes-end').selectric('refresh');

						}
					}
			        
			   },
			   viewRender: function (view, element) {

			   		$('.fc-day').each(function() {
			   			var self = $(this),
			 				date = self.data('date');

			 			var arrayEl = search(date, events);

			 			if(arrayEl) {
			 				self.addClass('fc-state-highlight');
			 			}

			   		})

			   		$('.fc-day').on('dblclick', function() {
			   			if($(this).hasClass('fc-state-highlight')) {
			   				$(this).removeClass('fc-state-highlight current');

			   				var curEvents = search($(this).data('date'), events);
			   				var curDates = function() {
							    for (var i=0; i < dates.length; i++) {
							        if (dates[i] === $(this).data('date')) {
							            return dates[i];
							        }
							    }
							};
			   				if(curEvents != undefined) { 
				   				for(var i = 0; i < events.length; i++) {
									if($(this).data('date') == events[i].start) {
										events.splice(i, 1)
									}
								}
							}
							if(curDates != undefined) { 
				   				for(var i = 0; i < dates.length; i++) {
									if($(this).data('date') == dates[i]) {
										dates.splice(i, 1)
									}
								}
							}
			   			}
			   		})

        		}
			});
		}
	} 
	//form submit
	function formSubmit() {
		if($('.js-dates-select').length) {
			$('.js-dates-select').submit(function(e) {
				e.preventDefault();
				$.ajax({
		            url: 'dates.json',
		            dataType:'JSON',
		            type: "post",
		            cache: false,
		            data:JSON.stringify(events),
		            contentType: "application/json",
		            success: function() {
		            	$('.js-calendar').fullCalendar( 'destroy' );
		       			mainCalendar();
		            }
		        });
		          
		        $('.js-calendar .fc-day').removeClass('active');
		        $('.js-calendar').fullCalendar('removeEvents');
				$('.js-calendar').fullCalendar('renderEvents', events);
		        $('.js-dates-popup').removeClass('visible');
			}) 
			$('.js-choose-date').on('click', function() {
				$(this).addClass('disabled').text('час обрано');

				for(var i = 0; i < dates.length; i++) {
					var curEvents = search(dates[i], events);
					var eventItem = {
						start:'',
						title:''
					}
					var 
						hoursStart = $('.selectric-js-calendar-hours-start .label').text(),
						minutesStart = $('.selectric-js-calendar-minutes-start .label').text(),
						hoursEnd = $('.selectric-js-calendar-hours-end .label').text(),
						minutesEnd = $('.selectric-js-calendar-minutes-end .label').text();
					if(curEvents == undefined) {
							eventItem.start = dates[i];
							eventItem.title = ''+hoursStart+'.'+minutesStart+' - '+hoursEnd+'.'+minutesEnd+'';
						events.push(eventItem)	
						
						console.log(events)
					} 
					if(curEvents != undefined && $('.js-calendar-small .fc-day.current').length) { 
						for(var i = 0; i < events.length; i++) {
							if(events[i].start == $('.js-calendar-small  .fc-day.current').data('date')) {
								events[i].title = ''+hoursStart+'.'+minutesStart+' - '+hoursEnd+'.'+minutesEnd+'';
							}
						}
						console.log(events)
					}
				}
				setTimeout(function() {
					$('.js-calendar-small .fc-day').removeClass('current');
				}, 200)
				
				console.log(events)
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

	function datesReset() {
		if($('.js-dates-reset').length) {
			$('.js-dates-reset').on('click', function() {
				$('.js-dates-popup').removeClass('visible');

				// $('.fc-state-highlight').removeClass("fc-state-highlight");

				// $('.js-dates-select').find($('select')).each(function() {
				// 	$(this).val($(this).find('option:first-child').val());
				// 	$(this).selectric('refresh');
				// });

				// events = [];
				// dates=[];

				// $.ajax({
		  //           url: '/dates.json',
		  //           dataType:'JSON',
		  //           type: "post",
		  //           cache: false,
		  //           data:JSON.stringify(events),
		  //           contentType: "application/json"
		  //       });

				// $('.js-calendar-lg').fullCalendar('removeEvents');
				// $('.js-calendar-lg').find('.fc-day').removeClass('active');
			})
		}
	}

 	

	$(document).on('ready', function() {
		datesOpen();
		datesReset();
		calendar();
		formSubmit();
		selectChange();
	});
}())
