

// credit for the following goes to actnormal.co
(function(window, $, undefined) {

	var currentPosition = 0;
	var targetPosition = 0;
	var browserWidth = 0;

	var loadedImages = 0;

	var autorun = function() {

		$("#aniimage1").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#aniimage2").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#aniimage3").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#aniimage4").one('load', function() {
			imageLoaded();
		}).each(function() {
			if(this.complete) $(this).load();
		});

		$("#aniimage1").attr("src", "strips/strip1.jpg");
		$("#aniimage2").attr("src", "strips/strip2.jpg");
		$("#aniimage3").attr("src", "strips/strip3.jpg");
		$("#aniimage4").attr("src", "strips/strip4.jpg");

	};

	var imageLoaded = function() {
		loadedImages++;

		if (loadedImages == 4) {
			$("#loader").animate({ opacity: 0 }, 500, "linear", function() {
				$("#loader").css("display","none");
			});
			setTimeout(function() {
				$("#allimages").css("display","block");
				$("#allimages").animate({ opacity: 1 }, 3000, "linear");
				startSlap();
			}, 500);
		}
	};

	var startSlap = function() {
		browserWidth = $(window).width();

		setInterval(function() {
			currentPosition += (targetPosition - currentPosition) / 4;
			var currentSlap = currentPosition / 640 * 93;
			currentSlap = Math.min(93, Math.max(0,currentSlap));
			var pos = Math.round(currentSlap) * -640;

			$("#allimages").css("left", pos);
		}, 30);

		$("body").bind('mousemove', function(e) {
			targetPosition = 640 - Math.max(0, Math.min(640, e.pageX - $('#imagecontainer').offset().left));
			$("#bugger").html(targetPosition);
		});

		$("body").bind('touchmove', function(e) {
			e.preventDefault();
			var touch = event.targetTouches[event.targetTouches.length-1];
			$("#bugger").html("TOUCH: " + touch.pageX + ", " + event.targetTouches.length);
			targetPosition = browserWidth - touch.pageX;
		});

		$(window).resize(function() {
			browserWidth = $(window).width();
		});
	};

	var isTouchDevice = function() {
		var el = document.createElement('div');
		el.setAttribute('ongesturestart', 'return;');
		return typeof el.ongesturestart === "function";
	};

	// On DOM ready
	$(autorun);

})(this, jQuery);
