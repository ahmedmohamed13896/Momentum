
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const main = document.getElementById('main_page');
const ourServices = document.getElementById('our_services');
const canvasContainer = document.querySelector('.canvas-container')
const context = canvas.getContext("2d");

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
ourServices.style.marginTop = (main.getBoundingClientRect().height * frameCount) + 'px';
console.log(main.getBoundingClientRect().height);



window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    console.log(maxScrollTop);

    const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
    );


    requestAnimationFrame(() => updateImage(frameIndex + 1));
});



preloadImages()

