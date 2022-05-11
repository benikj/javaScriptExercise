const videoElement = document.getElementById('video');
const button = document.getElementById('button');
// kje mu izleze na korisnikot da izbere media stream da go predade video elementot  i da play
async function selectMediaStream() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
             videoElement.play();
        }
    }catch (e) {
        
    }
}

button.addEventListener('click',async ()=>{
    //disable button
    button.disabled = true;
    //zapocni so picture in picture
    await videoElement.requestPictureInPicture();
    //reset button
    button.disabled = false;
    });

selectMediaStream()
