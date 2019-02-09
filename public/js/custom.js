// Featured products owl carousel
/* product-active */
$('.product-active').owlCarousel({
    loop:true,
    nav:true,
	navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        767:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

// New Arrivals owl carousel

$('.products-active').owlCarousel({
    loop:true,
    nav:true,
	navText:['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        480:{
            items:2
        },
        767:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

 // ------------------------------------------------------------------------------ //
      // Toggle Side Menu
      // ------------------------------------------------------------------------------ //
      $("nav.navbar.bootsnav .attr-nav").each(function () {
        $("li.side-menu > a", this).on("click", function (e) {
          e.preventDefault();
          $("nav.navbar.bootsnav > .side").toggleClass("on");
          $("body").toggleClass("on-side");
        });
      });
      $(".side .close-side").on("click", function (e) {
        e.preventDefault();
        $("nav.navbar.bootsnav > .side").removeClass("on");
        $("body").removeClass("on-side");
      });
