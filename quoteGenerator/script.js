
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
//na kraj ni ostanuva da go dademe loaderot
const loader =document.getElementById('loader');


//globalna promenliva koja kje bide dostapna za site
let apiQuotes =[];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden=true; // ova do tuka znaci deka koga e ukl loaderot nema da se prikaze nisto oscen loaderot
    
}

//hide laoding
function complete() {
    quoteContainer.hidden=false;
    loader.hidden = true;

}



//show new quotes
function newQuote(){
    loading();
    //odbiras random citat od nizata
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
  //  console.log(quote);

    //sakame da proverime dali avtorot ne e prazen
    if (!quote.author){
        authorText.textContent = 'UNKNOWN';
    }else{
        authorText.textContent=quote.author;
    }
    //promeni ja vrednosta ako e golema dolzinata na tekstot smali go fintot
    if (quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    //sea sakame da gi potpolnime vrednostite so citatie
    //voa gi predava vrednostite vo strin
//set quote hide loader
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author;
    complete();

}

//get qoutes from API
async function getQuotes() {
    loading();
    //ovde ni treba naseto url
    const apiUrl ='https://type.fit/api/quotes';
    try{
        //ova znaci deka responsot nema da bide potpolnet se dodeka ne fati podatoci od naseto api
        //ako ne ni bese voa asihrona funkcija i ako ne cekavme tuka
        //togas na responsot kje mu bese dodelena vrednost pred da stasame do fetch delot
        //sto bi predizvikalo error
       const response = await fetch(apiUrl);
       //sledno go zimame odgovorot i go pretvarame vo json objekt
       apiQuotes = await response.json();
     //  console.log(apiQuotes[1]); ocde samo so konzolata mozeme da gi gledame megjutoa nas ni treba po edna random quote
        newQuote();
    }catch (e) {
        
    }
}

//da mozeme da tvitnuvame
function tweetQuote() {
    //koristime zakoseni od pricina so akosenite ovozmozuvaat variablata da se predade kako string
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //window open ni ovozmozuva da otvorime nov prozorec so pomos na nekoe url
    window.open(twitterUrl,'_blank');

}

//event listener
//ova mi e koga kje kliknes na nekoe kopce da se sluci nest
newQuoteBtn.addEventListener('click',newQuote) ;//ovde kazuva deka evenetot e klik i na klik da se poviak funk newQuote
twitterBtn.addEventListener('click',tweetQuote);

//sea treba da ja povikame funkcijata za vreme na loadiranjeto na browserot
getQuotes();
