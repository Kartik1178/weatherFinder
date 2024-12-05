const weatherinput=document.querySelector('.inputbox'); 

const searchbutton=document.querySelector('#search');
searchbutton.addEventListener('click',function(){
    const inputvalue=weatherinput.value.trim();
debouncedFindWeather(inputvalue);

if(inputvalue!==""){
   weatherinput.value=""; 
    
}
}) 


async function findweather(location){

    const weatherin=document.querySelector('.weatherin');
    const weatherparameters=document.querySelector('.weatherparameters'); 
    try{
const apikey=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e4dec470bd60b80c2501f21912b5628c`;
const obtain=await fetch(apikey);
    console.log('apifetching');
    if(location==''){
        throw "please enter a city";
    }
    if(!obtain.ok){
        throw "invalid location";
    } 
   
    const obtainresponse=await obtain.json();
console.log(obtainresponse); 
const iconurl=obtainresponse.weather[0].icon;

weatherin.innerHTML=`Weather in ${obtainresponse.name}`;
const temperature=document.querySelector('.temperature').innerHTML=`${Math.ceil(obtainresponse.main.temp-273.15)} &deg;C`; 
const description=document.querySelector('.description').innerHTML=`${obtainresponse.weather[0].description}`; 
const descriptionicon=document.querySelector('.descriptionicon').innerHTML= `<img src="http://openweathermap.org/img/wn/${iconurl}@2x.png">`;
const humidity=document.querySelector('.humidity').innerHTML=` Humidity ${obtainresponse.main.humidity}`; 
const windspeed=document.querySelector('.windspeed').innerHTML=`Wind speed ${obtainresponse.wind.speed} km/h`
}
 catch(err){ 

console.log('cant find location');
weatherin.innerHTML=err; 

const children=weatherparameters.children; 
for (let i=0;i<children.length;i++){
    children[i].innerHTML='';
}

} 
}; 
function debounce(cb,delay=500){
let timeout;
    return(...args)=>{
timeout=clearTimeout(timeout);
    timeout= setTimeout(()=>{
cb(...args)
},delay);
}} 
 const debouncedFindWeather=debounce(location=>
    {findweather(location)}
);