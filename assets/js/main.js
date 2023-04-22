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

    // e.target.classList.add('active');
    // activeService.classList.add('active');
}

const frameCount = 21;
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

AOS.init({
    easing: 'ease-in-out-sine',
    once: false,
    mirror: true,
});


$(document).ready(function() {    
    /*** Show Main Page and Hide Loader*/
    $('#page_loader').hide();
    $('#main_page').show();
    
    /*** Prevent All links from updating URL */
    $('a[href]').each(link =>{
        $(link).click(e => {
            e.preventDefault();
        })
    });
    
    const html = document.documentElement;
    const canvas = document.getElementById("hero-lightpass");
    const main = document.getElementById('main_page');
    const home = document.getElementById('home_page');
    const ourServices = document.getElementById('our_services');
    const context = canvas.getContext("2d");

    


    const img = new Image()
    img.src = currentFrame(1);
    canvas.width = 1921;
    canvas.height = 1081;
    img.onload=function(){
      context.drawImage(img, 0, 0);
    }

    const updateImage = index => {
      img.src = currentFrame(index);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    }

    /** Set margin of ourServices page*/
    ourServices.style.marginTop = (home.getBoundingClientRect().height * frameCount) + 'px';



    window.addEventListener('scroll', () => {  
        const scrollTop = html.scrollTop;
        const maxScrollTop = home.getBoundingClientRect().height * frameCount;
        const scrollFraction = scrollTop / maxScrollTop;
        console.log('html.scrollHeight',html.scrollHeight);
        console.log('html.scrollHeight',window.innerHeight);
        
        const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(scrollFraction * frameCount)
            );
        console.log(frameIndex);


        requestAnimationFrame(() => updateImage(frameIndex + 1));
    });

});


// let scrollPosition = $(document).scrollTop();
