/** Animate Aos */
function initAOS(){
    AOS.init({
        easing: 'ease-in-out',
        once: false,
        mirror: true,
    });
}
const frameCount = 75;

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
    $([document.documentElement, document.body]).animate({scrollTop: 0}, {easing:'linear'});
}

/** scrollDots */
function scrollDot(sequence){
    const home = document.getElementById('home_page');
    let scrollValue =  ((home.getBoundingClientRect().height * 5) / frameCount) * (sequence-1) ;
    $([document.documentElement, document.body]).animate({scrollTop: scrollValue});
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
    const dots = $('#home_page .dots li');
    serviceLinks.forEach((link,i)=>{
        link.classList.remove('active');
        services[i].classList.remove('active');
    });

    e.target.classList.add('active');
    activeService.classList.add('active');
}

const currentFrame = index => (
    `./assets/images/sequence/png/${index}.png`
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
    const dots = $('.dots li');

    


    const img = new Image()
    img.src = currentFrame(1);
    canvas.width = 1921;
    canvas.height = 1081;
    img.onload=function(){
      context.drawImage(img, 0, 0);
    //   home.style.backgroundImage = `url('${currentFrame(1)}')`;
    }

    const updateImage = index => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    //   home.style.backgroundImage = `url('${currentFrame(index)}')`
    }

    /** Set margin of ourServices page*/
    ourServices.style.marginTop = (home.getBoundingClientRect().height * 5) + 'px';
    
    window.addEventListener('scroll', () => {  
        const scrollTop = html.scrollTop;
        const maxScrollTop = home.getBoundingClientRect().height * 5;
        const scrollFraction = scrollTop / maxScrollTop;
        if(scrollTop >= (home.getBoundingClientRect().height * 5)){
            ourServices.style.marginTop = (home.getBoundingClientRect().height * 4) + 'px';
            initAOS();
        }else{
            ourServices.style.marginTop = (home.getBoundingClientRect().height * 5) + 'px';
        }
        
        const frameIndex = Math.min(frameCount - 1,Math.ceil(scrollFraction * frameCount));
        const activeDots = [1,14,55,64,69];
        
        if(activeDots.indexOf(frameIndex + 1) !== -1){
            dots.each(function(index) {
                $(this).removeClass('active');
                if(index == activeDots.indexOf(frameIndex + 1)){
                    $(this).addClass('active');
                }
            });
        }

        
        context.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

});