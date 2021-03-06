$(function(){

    var main = new function(){

        // 横屏监测 DeviceOrientation 
        this.isSupportOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object");
        this.answer = [];
    }

    main.supportOrientation = function(){
        var orientation = window.orientation;
        switch (orientation) {
            case 90:
            case -90:
                orientation = "block"; //landscape
                break;
            default:
                orientation = "none";  //portrait
        }
        document.getElementById("orientLayer").style.display = orientation;
    }

    main.notSupportOrientation = function(){
        var orientation = (window.innerWidth > window.innerHeight) ? "block" : "none";
        document.getElementById("orientLayer").style.display = orientation;
    }

    main.updateOrientation = function(){
        if (this.isSupportOrientation) {
            main.supportOrientation()
        } else {
            main.notSupportOrientation()
        }
    }

    main.initOrientation = function(){
        main.updateOrientation();
        if (this.isSupportOrientation) {
            window.addEventListener("orientationchange", main.updateOrientation, false);
        } else {
            window.setInterval(main.updateOrientation, 5000);
        }
    }



    main.initOrientation();
    window.onresize = function(){
    	main.initOrientation();
    }


    main.initPage = function(){
        $('#app').fullpage({
            sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
            continuousVertical: false,
            controlArrows: false,
            loopHorizontal: false,
            afterLoad: function (anchorLink, index) {
                if (index == 2) {
                    $.fn.fullpage.setAllowScrolling(false, 'up');
                    $.fn.fullpage.setAllowScrolling(false, 'down');
                } 
            }
        });
    }
    main.initPage()

    main.pick = function(){
        var _this = this;

        $('.slide ul').on('click',function(e){

            var e = e || window.event;
            var target = e.target || e.srcElement;
            var index = $(this).data('id');

            if (target.nodeName.toLowerCase() == 'p') {

                var res = $(target).data('res');
                _this.answer[index-1] = res;
                console.log(_this.answer)
            }

            if (_this.answer.length == 5) {
                $('.submit').fadeIn()
            }

        })
    }
    main.pick()

    main.viewResult = function(){
        $.fn.fullpage.moveTo(3);  
    }
	

	$('.submit').on('click',function(){
         main.viewResult()
	})

});
