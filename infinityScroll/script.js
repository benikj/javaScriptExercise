const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photosArray = [];


const count = 30;
const apiKey = 'kvWlQA_wM0u-ePi8Pru4JAPT99IPuyOKTJ2CKeJsZzQ';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//proveri dali sliki se loadirale
function imageLoaded() {
   //    console.log(imagesLoaded);
    imagesLoaded++;
    if (imagesLoaded===totalImages){
        //togas se zavrsilo so loadiranje
        ready=true;
        loader.hidden=true;
     //   console.log('ready=',ready);
    }
}

//helper function to set attributes on dom
function setAttributes(element,attributes) {
    for (const key  in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


//display dthe photos
function  displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
   // console.log('total-images',totalImages);
    //izbrsi ja funkcijata za sekoj element vo photosarray
    photosArray.forEach((photo)=> {
       // kreirame <a> za link do unsplash
       const item = document.createElement('a');
       // item.setAttribute('href',photo.links.html);
       // item.setAttribute('target','_blank');
        setAttributes(item,{
           href:photo.links.html,
            target:'_blank',
        });
       //kriras <img> za slikata
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        //proveri koga zavrusva so loadiranje
        img.addEventListener('load',imageLoaded);

        //posledno <img> da go vneseme vo <a>
        //posle toa da gi vnesme vnatre vo imageCONTAINER
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//get photos from unsplash api
async function getPhotos() {

    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    }catch (e) {
        
    }
}
//proveri dali ako se skrola blizu najzdole se ukl povekje sliki
window.addEventListener('scroll',()=> {
    //ako visinata na windowsot odnosno ona sto se gleda na ekranot i skorlot e pogolema i ednakva od sevkupnata visina na dokumento
  if (window.innerHeight + window.scrollY>=document.body.offsetHeight-1000 && ready){
      ready=false;
        getPhotos();
  }
});

getPhotos();

