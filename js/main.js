$(document).on('ready', function() {	;(function() {		if($('.js-textarea').length) {			$('.js-textarea').on('input', function() {				var self = $(this),						value = self.val().length,					holder = $('.js-textarea-holder'),					counter = self.closest(holder).find($('.js-textarea-counter'));				counter.text(value);			})		}		if($('input[type="number"]').length) {			$('input[type="number"]').on('focusout', function() {				var self = $(this),					max = self.attr('max');				if(self.val() > max) {					self.val(max);				}			})		}		if($('.js-label-check').length) {			if($('.js-label-check').is(':checked')) {				$('.js-downloads-links').find($('input[type="file"]')).prop('disabled', false)			} else {				$('.js-downloads-links').find($('input[type="file"]')).prop('disabled', true)			}			$('.js-label-check').on('change', function() {				if($(this).is(':checked')) {					$('.js-downloads-links').find($('input[type="file"]')).prop('disabled', false)				} else {					$('.js-downloads-links').find($('input[type="file"]')).prop('disabled', true)				}			})		}	}())
	;(function() {		function tabs() {			if($('.js-tab-item').length) {				$('.js-tab-item').on('click', function() {					var self = $(this),						index = self.index(),						holder = $('.js-tabs'),						content = self.closest(holder).find($('.js-tabs-content')),						note = self.closest(holder).find($('.js-tabs-note'));					$('.js-tab-item').not(self).removeClass('active');					self.addClass('active');					if(index == 0 || index == 1) {						note.addClass('active');					} else {						note.removeClass('active');					}					content.removeClass('active');					content.eq(index).addClass('active');				})			}		}		tabs();	}($))
	;(function() {		function formReset() {			if($('.js-filter-reset').length) {				$('.js-filter-reset').on('click', function() {					var cur = $(this),						row = $('.js-filter-row'),						rowInner = $('.js-filter-row .js-filter-inner-second.visible'),						rowInnerFirst = $('.js-filter-row .js-filter-inner-first.visible'),						input = $('input[type="text"]'),						radio = $('input[type="radio"]'),						checkbox = $('input[type="checkbox"]'),						select = $('select');					cur.closest(row).removeClass('visible');					if(cur.closest(row).hasClass('js-first-row')) {						$('.js-first-row').removeClass('visible');						$('.js-second-row').removeClass('visible');						$('.js-filter-inner-first-trig').removeClass('active');						$('.js-filter-inner-second-trig').removeClass('active');						cur.closest($('form'))[0].reset();					}					if(cur.closest(row).hasClass('js-second-row')) {						$('.js-second-row').removeClass('visible');						$('.js-filter-inner-second-trig').removeClass('active');						if($('.js-first-row').find(radio).length) {							$('.js-first-row').find(radio).attr('checked', false);						}						// if(cur.closest(row).find(rowInner).find(input).length) {						// 	cur.closest(row).find(rowInner).find(input).val(' ');						// }						// if(cur.closest(rowInner).find(radio).length) {						// 	cur.closest(rowInner).find(radio).attr('checked', false);						// }						// if(cur.closest(rowInner).find(checkbox).length) {						// 	cur.closest(rowInner).find(checkbox).attr('checked', false);						// }						// if(cur.closest(rowInner).find(select).length) {						// 	cur.closest(rowInner).find(select).each(function() {						// 		$(this).selectric('refresh');						// 	})						// }					}				})			}		}		function mobileSelect() {			if($('.js-select-trig').length) {				var parent = $('.js-select'),					main = $('.js-select-field'); 				$('.js-select-trig').on('click', function() {					var cur = $(this);					cur.closest(parent).toggleClass('visible');				});			}		}		function filterSteps() {			if($('.js-filter').length) {				$('.js-filter').each(function() {					var cur = $(this),						category = cur.find($('.js-filter-category')),						subcategory = cur.find($('.js-filter-subcategory')),						firstRow = cur.find($('.js-first-row')),						secondRow = cur.find($('.js-second-row'));					// if(category.length) {					// 	category.on('change', function() {					// 		secondRow.removeClass('visible');					// 		if(category.is(':checked')) {					// 			firstRow.addClass('visible');					// 		}					// 	})					// }					// if(subcategory.length) {						// subcategory.on('change', function() {						// 	if(subcategory.is(':checked')) {						// 		secondRow.addClass('visible');						// 	}						// })					// }				});				$('.js-filter-inner-first-trig').on('click', function() {					var cur = $(this),						curId = cur.attr('data-id'),						block = $('.js-filter-inner-first'),						blockId = block.attr('data-id');					$('.js-second-row').removeClass('visible');					$('.js-first-row').addClass('visible');					// $('.js-filter-inner-first-trig').not(cur).removeClass('active');					// cur.addClass('active');					if(cur.hasClass('js-filter-all')) {						$('.js-first-row').removeClass('visible');					}					block.removeClass('active');					block.filter('[data-id="'+curId+'"]').addClass('active');				})				$('.js-filter-inner-second-trig').on('click', function() {					var cur = $(this),						curId = cur.attr('data-id'),						block = $('.js-filter-inner-second'),						blockId = block.attr('data-id');					// $('.js-filter-inner-second-trig').not(cur).removeClass('active');					// cur.addClass('active');					$('.js-second-row').addClass('visible');					if(!block.filter('[data-id="'+curId+'"]').length) {						$('.js-second-row').removeClass('visible');					}					block.removeClass('active');					block.filter('[data-id="'+curId+'"]').addClass('active');				})			}		}		function citySelect() {			var drop = $('.js-city-select-drop'),				holder =$('.js-city-select'),				btn = $('.js-city-select-btn');			if(btn.length) {				btn.on('click', function() {					var cur = $(this);					cur.toggleClass('active');					cur.closest(holder).find(drop).toggleClass('active');				})			}			if($('.js-group-list-btn').length) {				var 					holderList = $('.js-group-list');				$('.js-group-list-btn').on('click', function() {					var cur = $(this);					holderList.not(cur.closest(holderList)).removeClass('active');					cur.closest(holderList).toggleClass('active');				})					$('.js-group-list-item').on('click', function() {					var cur = $(this),						value = cur.text().trim(),						regionItem = cur.data('region'),						regionValue = cur.closest($('.js-group-list')).find($('.js-group-list-btn-text')).text().trim();					var newValue = '';					if(!cur.hasClass('js-data-region')) {						newValue = value + ', ' + regionValue;					}  else {						newValue = regionValue;					}					$('.js-city-select-btn-text').text(newValue);					$('.js-city-select-btn-text').attr('title', newValue);					drop.removeClass('active');					btn.removeClass('active');				})			}			$(document).on('click', function(e) {				var target = $(e.target),					btnShow = target.closest(btn).length,					dropV =  target.closest(drop).length;				if(!btnShow && !dropV && drop.hasClass('active')) {					drop.removeClass('active');					btn.removeClass('active');				}			})		}		mobileSelect();		formReset();		filterSteps();		citySelect();	}($))
	;(function() {		function mobileMenu() {			if($('.js-burger-menu').length) {				$('.js-burger-menu').on('click', function() {					var nav = $('.js-nav');					$(this).toggleClass('visible');					nav.toggleClass('visible');				})			}		}		mobileMenu();	}())
	;(function() {		function popup() {			if($('[data-popup]').length) {				//detect ios				var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;				$('[data-popup]').on('click', function() {					var self = $(this),						href = self.attr('href').substring(1), 						popups = $('.js-popup');						popup = popups.filter($('[id='+href+']')),						wrap = $('body');					popups.removeClass('visible');					if(popup.length) {						popup.addClass('visible');					}					wrap.addClass('hidden');					//add hidden for ios					if(iOS) { 						wrap.css({						 	top      : $(document).scrollTop()* -1,		                    position : 'fixed',		                    width    : '100%'		                });		            }					})				function close() {					$('.js-popup-close').on('click', function() {						var self = $(this),							wrap = $('body');						self.closest($('.js-popup')).removeClass('visible');						wrap.removeClass('hidden');						//remove hidden for ios						if(iOS) { 							var offset_b = $('body').offset().top* -1;							wrap.removeAttr('style');				            $(window).scrollTop(offset_b);				        }				        if($('.js-calendar-small .fc-state-highlight').length) {				        	$('a[href="#selectDates"]').addClass('active');				        } else {				        	$('a[href="#selectDates"]').removeClass('active');				        }					})				}				close()			};		}		popup();	}())
	$.fn.spinner = function(options) {		options = $.extend({	  }, options);	  var make = function() {				var self = $(this),					$input = !options.val ? self.find('input') : self.parent().find(options.val),					$plus = self.find('.js-spinner-plus'),					$minus = self.find('.js-spinner-minus'),					min = self.data('min') ? self.data('min') : options.min,					max = self.data('max') ? self.data('max') : options.max;				function disable() {					if (parseInt($input.val(), 10) <= min) {						$minus.addClass('disable');						$input.val(min)					} else if (parseInt($input.val(), 10) >= max) {						$plus.addClass('disable');					} else {						$minus.removeClass('disable');						$plus.removeClass('disable');					}				} 				disable();				$input.on('keydown', function(e){e.preventDefault()});				$plus.on('click', function(e) {					e.preventDefault();					if(parseInt($input.val(), 10) >= max){						return false;					} else {						$input.val( parseInt($input.val(), 10) + 1);						disable();						self.trigger('plus');						self.trigger('update');					}				});				$minus.on('click', function(e) {					e.preventDefault();					if(parseInt($input.val(), 10) <= min){						return false;					} else {						$input.val( parseInt($input.val(), 10) - 1);						disable();						self.trigger('minus');						self.trigger('update');					}				});			}	  return this.each(make); 	}	$('.js-spinner').spinner({		// val:'.js-spinner-field'	});
	;(function() {		function tradesGallery() {			if($('.js-gallery-main').length) {				$('.js-gallery-main').slick({					asNavFor:$('.js-gallery-thumbs'),					prevArrow:'<span class="slick-arrow--prev"><svg class="icon-arrow-lg"><use xlink:href="#arrow"></use></svg></span>',					nextArrow:'<span class="slick-arrow--next"><svg class="icon-arrow-lg"><use xlink:href="#arrow"></use></svg></span>'				})			}			if($('.js-gallery-thumbs').length) {				$('.js-gallery-thumbs').slick({					asNavFor:$('.js-gallery-main'),					variableWidth:true,					focusOnSelect:true,					prevArrow:'<span class="slick-arrow--prev"><svg class="icon-arrow-lg"><use xlink:href="#arrow"></use></svg></span>',					nextArrow:'<span class="slick-arrow--next"><svg class="icon-arrow-lg"><use xlink:href="#arrow"></use></svg></span>'				})			}		}		tradesGallery();	}())	;(function() {		function fullpage() {			if($('#fullpage').length) {				$('#fullpage').fullpage({						navigation: true,						navigationPosition: 'right',						anchors:['', 'features', 'index-scheme', 'video'],						scrollOverflow:false,						afterResize: function(){							$.fn.fullpage.reBuild();						},					});				// function reinitFulpage() {				// 	if(window.innerWidth > 764 && $('.fullpage-wrapper.fp-destroyed').length) {				//        $('#fullpage').fullpage({				// 			navigation: true,				// 			navigationPosition: 'right',				// 			anchors:['', 'features', 'index-scheme', 'video']				// 		});				//        $('#fullpage').removeClass('mobile');				//     }				//     else if(window.innerWidth < 765 && !$('.fullpage-wrapper.fp-destroyed').length) {				//         $.fn.fullpage.destroy('all');				//          $('#fullpage').addClass('mobile');				//     }				// }				// reinitFulpage();				$(window).on('resize', function() {				   // reinitFulpage()				})			}		}		fullpage();	}())	function viewportChange() {	    if (window.outerWidth < 765) {	        if (!$('#meta-mob').length) {	            $('head').find('meta[name*="viewport"]').remove();	            $('head').append('<meta id="meta-mob" name="viewport" content="width=764, user-scalable=no">')	        }	    } else {	        if ($('#meta-mob').length) {	            $('head').find('#meta-mob').remove();	            $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')	        }	    }	}	$(window).on('load', viewportChange)	$(window).on('resize', viewportChange)	// ;(function() {	// 	function scrollTo() {	// 		if($('.mobile .js-anchor-link').length) {	// 			// if(window.innerWidth < 765) { 	// 				$('.mobile .js-anchor-link').on('click', function() {	// 					var cur = $(this),	// 						curHrefFull = cur.attr('href'),	// 						curHref = curHrefFull.substring(1),	// 						scrollTo = $('.mobile .section[data-anchor='+curHref+']');	// 					$('html,body').not($('.fp-enabled')).animate({ 	// 			            scrollTop: scrollTo.offset().top	// 			        }, 500);     	// 				})	// 			// }	// 		}	// 	}	// 	scrollTo();	// 	$(window).on('resize', function() {	// 		scrollTo()	// 	})	// }($))	// $('head').find('<meta[name="viewport"]>').attr('content', 'width=device-width, initial-scale = 1');	// ;(function() {	// 	function metaViewport() {	// 		if (window.innerWidth < 765) {	// 		   // $('head').remove('<meta name="viewport" content="width=764, initial-scale=1"/>');	// 		   $('head').append('<meta name="viewport" content="width=764"/>');	// 		} else {	// 			// $('head').remove('<meta name="viewport" content="width=764"/>');	// 			$('head').append('<meta name="viewport" content="width=764, initial-scale=1"/>');	// 		}	// 	}	// 	metaViewport();	// 	$(window).on('resize', function() {	// 		metaViewport();	// 	})	// }())	;(function() {		function customSelect() {			if($('select').length) {				$('select').selectric({					arrowButtonMarkup: '<svg class="icon-arrow select-arrow"> <use xlink:href="#arrow"></use> </svg>',					onInit: function() {						$('.selectric-wrapper').each(function() {							$(this).find($('.selectric-scroll')).mCustomScrollbar();						})					}				});			}		}		function inputMask() {			if($('.js-input-mask').length) {				$('.js-input-mask').mask("+99(999) 999-9999");			}		}		inputMask();		customSelect();	}())	;(function() {		function slideHeight() {			if($('.js-slide-height-btn').length) {				var btn = $('.js-slide-height-btn'),					holder = $('.js-slide-height'),					txt = $('.js-slide-height-txt'),					flag = false;				btn.on('click', function() {					var self = $(this),						txtHeight = self.closest(holder).find(txt).outerHeight() + 20;					if(flag == false) {						self.addClass('active');						self.closest(holder).animate({							height: txtHeight,							duration: 200						}).addClass('active');						flag = true;					} else {						self.removeClass('active');						self.closest(holder).removeAttr('style').removeClass('active');						flag =false;					}				})			}		}		slideHeight();	}())})$(window).on('load', function() {	;(function() {		function equalHeights() {			if($('.js-equal-height').length) {				$('.js-equal-height-parent').each(function() {					var item = $(this).find($('.js-equal-height'));					item.equalHeights();					$(window).on('resize', function() {						item.css('height', 'auto');						item.equalHeights();					})				})			}		}		equalHeights();	}($))	;(function(){		function customScroll() {			if($('.js-scroll').length) {				$('.js-scroll').mCustomScrollbar();			}		}		customScroll();		function scrollArrows() {			if($('.js-scroll-arrows').length) {				$('.js-scroll-arrows').mCustomScrollbar({					scrollButtons:{ enable: true }				});			}		}		scrollArrows();	}())})