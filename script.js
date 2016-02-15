var to_right = document.getElementById('next'),
    to_left = document.getElementById('prew'),
    radio_button = document.getElementById('progress-box'),
    CAROUSEL = {
		slides:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'], // коллекция изображений
		current_slide:0, // номер стартового изображения
		ready_click:true, // если false - запретить клик по кнопкам
		set: function(image){ // задать фоновое изображение
			var slider_box = document.getElementById('slider-box');
			slider_box.style.backgroundImage = 'url(img/'+image+')';
		},
		init: function(){ // запуск слайдера с начальной позицией
			this.set(this.slides[this.current_slide]);
		},
		right: function(){ // на один слайд вправо
			if(this.ready_click){
                if(this.current_slide < this.slides.length - 1){
                this.current_slide ++;
				}else{
	                this.current_slide = 0;
				}
				CAROUSEL.init();
				VIEW.activeSlide(CAROUSEL.current_slide);
				this.ready_click = false;
				setTimeout(function(){
        	        CAROUSEL.ready_click = true;
                }, 500);    
			};
		},
	    left: function(){ // на один слайд влево
	    	if(this.ready_click){
                if(this.current_slide > 0){
                this.current_slide --;
	    		}else{
	    			this.current_slide = this.slides.length - 1;
	    		}
	    		CAROUSEL.init();
	    		VIEW.activeSlide(CAROUSEL.current_slide);
	    		this.ready_click = false;
	    		setTimeout(function(){
        	        CAROUSEL.ready_click = true;
                }, 500); 
	    	};
	    },
	    moveTo: function(e){ // переход к слайду по клику на радиокнопке
	    	if(this.ready_click){
	    		e = e || window.event;
	            var el_id = +e.target.id[2] || e.srcElement.id[2];
		        if(isNaN(el_id)){
		            el_id = CAROUSEL.current_slide;
		        }else{
		        	CAROUSEL.current_slide = el_id;
		        };
				CAROUSEL.init();
				VIEW.activeSlide(CAROUSEL.current_slide);
				this.ready_click = false;
	    		setTimeout(function(){
        	        CAROUSEL.ready_click = true;
                }, 500); 
	    	}
		}
    },
    VIEW = {
    	set: function(numbersSlide){ // отрисовка индикаторов слайдов
    		var progress_box = document.getElementById('progress-box'),
    	        progress_box__item;
    	    for(i=0; i < numbersSlide; i ++){
    	    	progress_box__item = document.createElement('div');
                progress_box__item.id = 's-'+i+'';
                progress_box__item.className = 'slide';
                progress_box.appendChild(progress_box__item);
    	    }
    	},
    	activeSlide: function(slideNumber, prewSlideNumber){ // отрисовка текущего слайда
    		var prev_slide = document.getElementsByClassName('slide');
    		    active_slide = document.getElementById('s-'+slideNumber+'');
    		    arr_slides = [].slice.call(prev_slide);
    		arr_slides.forEach(function(item){
         	    item.style.background = '';
            });
            active_slide.style.background = '#CCC';
	    },
	    init: function(){
            this.set(CAROUSEL.slides.length);
            this.activeSlide(CAROUSEL.current_slide);
    	},
    };

window.onload = function(){ // запуск слайдера после загрузки страницы
	CAROUSEL.init();
	VIEW.init();
    to_right.onclick = function(){
    	CAROUSEL.right();
    };
    to_left.onclick = function(){
    	CAROUSEL.left();
    };
    radio_button.onclick = function(e){
        CAROUSEL.moveTo(e);
    };
};