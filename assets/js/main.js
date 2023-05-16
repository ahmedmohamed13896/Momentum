/*** Variables  ***/
const html = document.documentElement;
const home = document.getElementById("home_page");
const ourServices = document.getElementById("our_services");
const homeHeight = home.getBoundingClientRect().height;
let slidesLength = 4;
let swiper = new Swiper(".homeSwiper", {
  direction: "vertical",
  speed: 1000,
  slidesPerView: 1,
  effect: "fade",
  spaceBetween: 0,
  mousewheel: true,
  snapOnRelease: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    draggable: true,
  },
  onInit: function(sw){
    slidesLength = sw.slides.length;
  },
  loop: false,
  loopPreventsSliding: true,
  observer: true,
});


let timeOut = 0;
let activeLinkNumber = 1;

/** Animate Aos */
function initAOS() {
  AOS.init({
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });
}

/** Refresh Aos  */
function refreshAOS() {
  AOS.refresh({
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });
}

/** scrollToSection */
function scrollToSection(e, id) {
  e.preventDefault();

  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(id).offset().top + 1,
    },
    { easing: "linear" }
  );
  $("#home_page").fadeOut(1000);
  document.documentElement.style.overflow = "overlay";
}

/** scrollToTop */
function scrollToTop(e) {
  e.preventDefault();
  $([document.documentElement, document.body]).animate({ scrollTop: 0 });
  $("#home_page").fadeIn(1000);
  swiper.slideTo(0, 100)
}

/** scrollDots */
function scrollDot(step) {
  const home = document.getElementById("home_page");
  let scrollValue =
    home.getBoundingClientRect().height * (step == 1 ? 0 : step);
  $([document.documentElement, document.body]).animate({
    scrollTop: scrollValue,
  });
}


/** GotoNext */
function gotoNext() {
  const allServices = document.querySelectorAll(".services .service");
  const allLinks = document.querySelectorAll(".services-menu li");
  document.getElementById("prev").classList.remove("disabled");

  activeLinkNumber++;
  if(activeLinkNumber >= allServices.length){
    activeLinkNumber = allServices.length;
    document.getElementById("next").classList.add("disabled");
  }

  clearTimeout(timeOut);
  
  for (let i = 0; i < allServices.length; i++) {
    if (
      allServices[i].classList.contains("active") &&
      i != allServices.length - 1
    ) {
      // remove active from previous service
      allServices[i].classList.remove("active");
      allLinks[i].classList.remove("active");

      allServices[i + 1].classList.add("active");
      allLinks[i + 1].classList.add("active");
      allServices[i + 1].querySelectorAll(".aos-animate").forEach((item) => {
        item.classList.remove("aos-animate");
        item.classList.remove("aos-animate");
        timeOut = setTimeout(() => {
          item.classList.add("aos-animate");
          item.classList.add("aos-animate");
        }, 0);
      });
      AOS.refresh();
      break;
    } else if (i != allServices.length - 1) {
      allServices[i].classList.remove("active");
      allLinks[i].classList.remove("active");
    }
  }
}

/** GotoPrev */
function gotoPrev() {
  const allServices = document.querySelectorAll(".services .service");
  const allLinks = document.querySelectorAll(".services-menu li");
  document.getElementById("next").classList.remove("disabled");
  
  activeLinkNumber--;
  if(activeLinkNumber <= 1){
    activeLinkNumber = 1;
    document.getElementById("prev").classList.add("disabled");
  }

  clearTimeout(timeOut);

  for (let i = 0; i < allServices.length; i++) {
    if (allServices[i].classList.contains("active") && i != 0) {
      // remove active from previous service
      allServices[i].classList.remove("active");
      allLinks[i].classList.remove("active");

      allServices[i - 1].classList.add("active");
      allLinks[i - 1].classList.add("active");
      allServices[i - 1].querySelectorAll(".aos-animate").forEach((item) => {
        item.classList.remove("aos-animate");
        item.classList.remove("aos-animate");
        timeOut = setTimeout(() => {
          item.classList.add("aos-animate");
          item.classList.add("aos-animate");
        }, 0);
      });
      AOS.refresh();
      break;
    } else if (i != 0) {
      allServices[i].classList.remove("active");
      allLinks[i].classList.remove("active");
    }
  }
}

/** set Active link */
function setActiveLink(e, id, number) {
  activeLinkNumber = number;
  e.preventDefault();
  const serviceLinks = document.querySelectorAll(".services-menu li");
  const services = document.querySelectorAll(".services-list .service");
  const activeService = document.querySelector(id);
  serviceLinks.forEach((link, i) => {
    link.classList.remove("active");
    services[i].classList.remove("active");
  });

  e.target.classList.add("active");
  activeService.classList.add("active");
  
  services[number-1].querySelectorAll(".aos-animate").forEach((item) => {
    item.classList.remove("aos-animate");
    item.classList.remove("aos-animate");
    timeOut = setTimeout(() => {
      item.classList.add("aos-animate");
      item.classList.add("aos-animate");
    }, 2000);
  });

  AOS.refresh();

  if(activeLinkNumber == serviceLinks.length){
    document.getElementById("prev").classList.remove("disabled");
    document.getElementById("next").classList.add("disabled");
  }
  else if(activeLinkNumber == 1){
    document.getElementById("next").classList.remove("disabled");
    document.getElementById("prev").classList.add("disabled");
  }else{
    document.getElementById("next").classList.remove("disabled");
    document.getElementById("prev").classList.remove("disabled");
  }
}

initAOS();


$(window).on('load', function() {
  document.querySelectorAll('.mobile-video').forEach(v=>{
    v.addEventListener('ended', ()=>{}, false);
  });
  
  /*** Show Hide Loader*/
  $("#page_loader").hide();

  /*** Prevent All links from updating URL */
  $("a[href]").each((link) => {
    $(link).click((e) => {
      e.preventDefault();
    });
  });

  document.documentElement.style.overflow = "hidden";
  // Do something on slide #2 (note that index starts from 0)
  let swipIsActive = true;

  document.querySelector(".stopped_video").currentTime = 0;
  //mobile
  // document.querySelector(".stopped_video.mobile-video").currentTime = 0;
  // document.querySelector(".stopped_video.mobile-video").play();

  swiper.on("slideChange", (sw) => {
    sw.mousewheel.disable();
    clearTimeout(timeOut);
    swipIsActive = false;
    document.documentElement.style.overflow = "hidden";
    if (!sw.mousewheel.enabled) {
      if (swiper.realIndex == 0) {
        document.querySelector(".stopped_video").currentTime = 0;
        
        //mobile
        // document.querySelector(".stopped_video.mobile-video").currentTime = 0;
        // document.querySelector(".stopped_video.mobile-video").play();

        timeOut = setTimeout(() => {
          sw.mousewheel.enable();
        }, 500);
      }
      if (swiper.realIndex == 1) {
        document.querySelector(".stopped_video").currentTime = 0;
        document.querySelector(".video_1").currentTime = 0;
        document.querySelector(".video_1").play();
        document.querySelector(".video_1").playbackRate = .7;
        //mobile
        // document.querySelector(".stopped_video.mobile-video").currentTime = 0;
        document.querySelector(".video_1.mobile-video").currentTime = 0;
        document.querySelector(".video_1.mobile-video").play();
        document.querySelector(".video_1.mobile-video").playbackRate = .7;
        timeOut = setTimeout(() => {
          sw.mousewheel.enable();
        }, 2500);
      } else if (swiper.realIndex == 2) {
        document.querySelector(".video_2").currentTime = 0;
        document.querySelector(".video_2").play();
        document.querySelector(".video_2").playbackRate = .7;
        //mobile
        document.querySelector(".video_2.mobile-video").currentTime = 0;
        document.querySelector(".video_2.mobile-video").play();
        document.querySelector(".video_2.mobile-video").playbackRate = .7;
        timeOut = setTimeout(() => {
          sw.mousewheel.enable();
        }, 3500);
      } else if (swiper.realIndex == 3) {
        document.querySelector(".video_3").currentTime = 0;
        document.querySelector(".video_3").play();
        document.querySelector(".video_3").playbackRate = .7;
        // mobile
        document.querySelector(".video_3.mobile-video").currentTime = 0;
        document.querySelector(".video_3.mobile-video").play();
        document.querySelector(".video_3.mobile-video").playbackRate = .7;
        timeOut = setTimeout(() => {
          sw.mousewheel.enable();
        }, 4500);
      } else if (swiper.realIndex == 4) {
        document.querySelector(".video_4").currentTime = 0;
        document.querySelector(".video_4").play();
        // mobile
        document.querySelector(".video_4.mobile-video").currentTime = 0;
        document.querySelector(".video_4.mobile-video").play();
        timeOut = setTimeout(() => {
          sw.mousewheel.enable();
          swipIsActive = true;
        }, 5500);
      }
      // else if (swiper.realIndex == 5) {
      //   document.querySelector('.video_5').currentTime = 0;
      //   document.querySelector('.video_5').play();
      //   timeOut = setTimeout(() => {
      //     sw.mousewheel.enable();
      //     swipIsActive = true;
      //   }, 5000);
      // }
    }
  });

  $(window).on('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
    $(window).trigger('mousewheel wheel');
  });

  let delta = 0;
  let serviceTop = ourServices.getBoundingClientRect().top;
  /*** Mouse Wheel event */
  $(window).on("wheel", (e) => {
    delta = e.originalEvent.deltaY;
    serviceTop = ourServices.getBoundingClientRect().top;

    if (delta > 0){
      // scroll down
      handleScrollDown(serviceTop);
    } 
    else if(delta <= 0){
      // scroll up
      handleScrollUp(serviceTop);
    }    
  });


  let touchstartY = 0
  let touchendY = 0
      
  function checkDirection() {
    if (touchendY < touchstartY) {
      // console.log('down');
      handleScrollDown();
    }
    if (touchendY > touchstartY) {
      // console.log('up');
      handleScrollUp();
    }
  }

  document.addEventListener('touchstart', e => {
    serviceTop = ourServices.getBoundingClientRect().top;
    touchstartY = e.changedTouches[0].screenY
  })
  document.addEventListener('touchmove', e => {
    serviceTop = ourServices.getBoundingClientRect().top;
    if (touchendY < touchstartY) {
      // console.log('down');
      handleScrollDown();
    }
    if (touchendY > touchstartY) {
      // console.log('up');
      handleScrollUp();
    }
  })

  document.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0].screenY
    checkDirection()
  })

  // detect postion after loan 
  if (ourServices.getBoundingClientRect().top < 0) {
    document.documentElement.style.overflow = "overlay";
    $(home).fadeOut();
    swiper.slideTo(slidesLength, 100)
  } else {
    document.documentElement.style.overflow = "hidden";
    $(home).fadeIn();
  }


  /*** Resize Event */
  $(window).resize(function(){
    if (ourServices.getBoundingClientRect().top < 0) {
      document.documentElement.style.overflow = "overlay";
      $(home).fadeOut();
    } else {
      document.documentElement.style.overflow = "hidden";
      $(home).fadeIn();
    }
  });
  
  // handle scroll down
  function handleScrollDown(){
    if(swiper.realIndex == slidesLength && swipIsActive){
      if (serviceTop <= 0) {
        document.documentElement.style.overflow = "overlay";
        $(home).hide();
        return;
      } else if (serviceTop > 0) {
        $(home).show();
        document.querySelector(`.video_${slidesLength}`).currentTime = 0;
        document.querySelector(`.video_${slidesLength}`).play();
        // mobile
        document.querySelector(`.video_${slidesLength}.mobile-video`).currentTime = 0;
        document.querySelector(`.video_${slidesLength}.mobile-video`).play();
        timeOut = setTimeout(() => {
          swiper.mousewheel.enable();
          swipIsActive = true;
        }, 5500);
        document.documentElement.style.overflow = "hidden";
        return;
      }
    }
  }

  // handle scroll Up
  function handleScrollUp(){
    if(serviceTop == 0){
      $(home).show();
      if (swiper.realIndex == 4 && swipIsActive) {
        swipIsActive = false;
        document.querySelector(".video_4").currentTime = 0;
        document.querySelector(".video_4").play();
        // mobile
        document.querySelector(".video_4.mobile-video").currentTime = 0;
        document.querySelector(".video_4.mobile-video").play();
        timeOut = setTimeout(() => {
          swipIsActive = true;
          clearTimeout(timeOut);
        }, 5500);
      }
      document.documentElement.style.overflow = "hidden";
    }else{
      document.documentElement.style.overflow = "overlay";
    }
  }
});

