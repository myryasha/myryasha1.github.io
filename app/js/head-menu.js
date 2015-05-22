$(function (){ 
	if (screen.width < 586) {

		$('nav').css({'display' : 'block'});
		
		var swipeStart;
		var swipeEnd;
		var swipeMod = 0;
		var swipePoint;
		var swipeFin = 0;
		var navLength = 0;
		var leftStop = 0;
		var rightStop;
		var fin = 100;
		var doc_w = $(document).width();
		var speed_a = 300;

		var start_t;
		var fin_t;
		var disc_t;
		var speed_s;
		var mass = 500;
		var imp_s;


		//ширина блока с оступами
		function blockWidth (block) {
			var padding = +block.css('padding-left').slice(0, -2) + +block.css('padding-right').slice(0, -2);
			var result = block.width() + padding;
			return result;
		};
		// вычисляем ширину ленты навигации
		$('.menu__item').each(function () {
			navLength += blockWidth($(this));
		});
		// получаем точку остановки справа.
		rightStop = doc_w - navLength;

		$('nav').on('touchstart', function(event){
			swipeStart =  event.originalEvent.changedTouches[0].clientX; // получаем точку первого касания
			start_t = Date.now();
			
			
		});
		$('nav').on('touchmove', function(event){
			swipePoint =  event.originalEvent.changedTouches[0].clientX; // координаты нахождения пальца при движении
			swipeMod = swipeFin + swipePoint - swipeStart; // получаем смещение
			

			// в этом диапазоне можно свайпать
			if ((swipeMod < (leftStop + fin)) && (swipeMod > (rightStop - fin))) {
			$('.menu__item').css({'left' : swipeMod});
			
			};
			
		});

		$('nav').on('touchend', function(event){
			swipeEnd =  event.originalEvent.changedTouches[0].clientX;
			fin_t = Date.now();
			disc_t = (fin_t - start_t);
			speed_s = (swipeEnd-swipeStart)/disc_t;
			imp_s = speed_s*mass;
		
			console.log('Импульс ' + imp_s);
			console.log(swipeEnd-swipeStart);
			swipeMod += imp_s;
			if ((swipeMod < leftStop) && (swipeMod > rightStop)){
				$('.menu__item').animate({'left' : swipeMod}, 500);
				swipeFin = swipeMod;
			};

			if (swipeMod > leftStop){
				$('.menu__item').animate({'left' : '0'}, speed_a);
				swipeFin = 0;
			};

			if (swipeMod < (rightStop)) {
				$('.menu__item').animate({'left' : rightStop}, speed_a);
				swipeFin = rightStop;
			};

		});
		


	}
});