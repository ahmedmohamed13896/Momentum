/** Animate Aos */
function initAOS(){
    AOS.init({
        easing: 'ease-in-out',
        once: false,
        mirror: true,
    });
}

const frameCount = 80;

/** scrollToSection */
function scrollToSection(e,id) {
    e.preventDefault();
    
    $([document.documentElement, document.body]).animate({
        scrollTop: $(id).offset().top
    }, {easing:'linear'});
}

/** scrollToTop */
function scrollToTop(e) {
    e.preventDefault();
    $([document.documentElement, document.body]).animate({scrollTop: 0});
}

/** scrollDots */
function scrollDot(sequence){
    const home = document.getElementById('home_page');
    let scrollValue =  ((home.getBoundingClientRect().height * 7) / frameCount) * (sequence-1) ;
    // $([document.documentElement, document.body]).animate({scrollTop: scrollValue});
    window.scroll(0, scrollValue)
}

/** GotoNext */
function gotoNext(){
    const allServices = document.querySelectorAll('.services .service');
    const allLinks = document.querySelectorAll('.services-menu li');
    console.log(allServices);
    
    for(let i =0; i<allServices.length; i++){
        if(allServices[i].classList.contains('active') && (i != (allServices.length-1))){
            // remove active from previous service
            allServices[i].classList.remove('active');
            allLinks[i].classList.remove('active');

            allServices[i+1].classList.add('active');
            allLinks[i+1].classList.add('active');
            allServices[i+1].querySelectorAll('.aos-animate').forEach(item=>{
                item.classList.remove('aos-animate');
                item.classList.remove('aos-animate');
                setTimeout(() => {
                    item.classList.add('aos-animate');
                    item.classList.add('aos-animate'); 
                }, 0);
            })
            break;
        }else if(i != (allServices.length-1)){
            allServices[i].classList.remove('active');
            allLinks[i].classList.remove('active');
        }
    }
}

/** GotoPrev */
function gotoPrev(){
    const allServices = document.querySelectorAll('.services .service');
    const allLinks = document.querySelectorAll('.services-menu li');
    for(let i =0; i<allServices.length; i++){
        if(allServices[i].classList.contains('active') && (i != 0)){
            // remove active from previous service
            allServices[i].classList.remove('active');
            allLinks[i].classList.remove('active');

            allServices[i-1].classList.add('active');
            allLinks[i-1].classList.add('active');
            allServices[i-1].querySelectorAll('.aos-animate').forEach(item=>{
                item.classList.remove('aos-animate');
                item.classList.remove('aos-animate');
                setTimeout(() => {
                    item.classList.add('aos-animate');
                    item.classList.add('aos-animate'); 
                }, 0);
            })
            break;
        }else if(i != 0){
            allServices[i].classList.remove('active');
            allLinks[i].classList.remove('active');
        }
    }
}

/** set Active link */
function setActiveLink(e,id){
    e.preventDefault();
    const serviceLinks = document.querySelectorAll('.services-menu li');
    const services = document.querySelectorAll('.services-list .service');
    const activeService = document.querySelector(id);
    serviceLinks.forEach((link,i)=>{
        link.classList.remove('active');
        services[i].classList.remove('active');
    });

    e.target.classList.add('active');
    activeService.classList.add('active');
}

const currentFrame = index => (
    `./assets/images/sequence/jpg/${index}-80.jpg`
)
const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

preloadImages();

initAOS();


$(document).ready(function() {    
    /*** Show Hide Loader*/
    $('#page_loader').hide();
    
    /*** Prevent All links from updating URL */
    $('a[href]').each(link =>{
        $(link).click(e => {
            e.preventDefault();
        })
    });
    
    const html = document.documentElement;
    const canvas = document.getElementById("hero-lightpass");
    const home = document.getElementById('home_page');
    const ourServices = document.getElementById('our_services');
    const context = canvas.getContext("2d");
    const dots = $('#home_page .dots li');

    


    const img = new Image()
    img.src = currentFrame(1);
    canvas.width = 1920;
    canvas.height = 1080;
    img.onload=function(){
      context.drawImage(img, 0, 0);
    }

    const updateImage = index => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    }

    /** Set margin of ourServices page*/
    ourServices.style.marginTop = (home.getBoundingClientRect().height * 7) + 'px';
    

    // Setup isScrolling variable
    let isScrolling;
    let lastScroll = html.scrollTop;
    let inHome = true;

    window.addEventListener('scroll', (e) => {  

        const scrollTop = html.scrollTop;
        const maxScrollTop = home.getBoundingClientRect().height * 7;
        const scrollFraction = scrollTop / maxScrollTop;
        if(scrollTop >= (home.getBoundingClientRect().height * 7)){
            ourServices.style.marginTop = (home.getBoundingClientRect().height * 6) + 'px';
            initAOS();
        }else{
            ourServices.style.marginTop = (home.getBoundingClientRect().height * 7) + 'px';
        }
        
        const frameIndex = Math.min(frameCount - 1,Math.ceil(scrollFraction * frameCount));
        const activeDots = [1,9,49,63,67];
        
        if(activeDots.indexOf(frameIndex + 1) !== -1){
            dots.each(function(index) {
                $(this).removeClass('active');
                if(index == activeDots.indexOf(frameIndex + 1)){
                    $(this).addClass('active');
                }
            });
        }

        console.log(frameIndex+1);

        canvas.classList.add('touch-disbled');
        home.classList.add('touch-disbled');
        
        // Clear our timeout throughout the scroll
	    window.clearTimeout( isScrolling );

        

        // Set a timeout to run after scrolling ends
    	isScrolling = setTimeout(function() {
            canvas.classList.remove('touch-disbled');
            home.classList.add('touch-disbled');

            // scroll up
            if(lastScroll > scrollTop){
                
                if((frameIndex+1 == frameCount)){
                    // check if the view inside home
                    if(maxScrollTop > scrollTop){
                        scrollDot(67);
                    }
                }else
                 if((frameIndex+1 < frameCount) && (frameIndex+1 > 67)){
                    scrollDot(67);
                }else if((frameIndex+1 < 67) && (frameIndex+1 > 63)){
                    scrollDot(63);
                }else if((frameIndex+1 < 63) && (frameIndex+1 > 49)){
                    scrollDot(49);
                }else if((frameIndex+1 < 49) && (frameIndex+1 > 9)){
                    scrollDot(9);
                }else if((frameIndex+1 < 9) && (frameIndex+1 > 1)){
                    scrollDot(1);
                }
                
            }else{
                // scroll down
                if((frameIndex+1 == frameCount)){
                    // check if the view inside home
                    if(maxScrollTop > scrollTop){
                        scrollDot(frameCount+2);
                    }
                }else if(frameIndex+1 > 1 && (frameIndex+1) < 9){
                    scrollDot(9);
                }
                else if((frameIndex+1 > 9) && (frameIndex+1 < 49)){
                    scrollDot(49);
                }
                else if((frameIndex+1 > 49) && (frameIndex+1 < 63)){
                    scrollDot(63);
                }else if((frameIndex+1 > 63) && (frameIndex+1 < 67)){
                    scrollDot(67);
                }
                else if((frameIndex+1 > 67) && (frameIndex+1 < frameCount)){
                    scrollDot(frameCount+2);
                }
            }
            
            lastScroll = scrollTop;
    	}, 66);

        
        // context.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

});