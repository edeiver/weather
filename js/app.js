window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescp = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection =  document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.longitude;
            const prooxy = 'https://cors-anywhere.herokuapp.com/';
            const api= `${prooxy}https://api.darksky.net/forecast/b595b394a16ead64582250500451ff69/${lat},${long}`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon }= data.currently;
                //set DOM elements from the API
                temperatureDegree.textContent=temperature;
                temperatureDescp.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //formura for c
                let celsius = (temperature - 32)*(5/9);
                //set icon
                setIcons(icon, document.querySelector('.icon'));
                //change to f a c
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            })
        });
        
    }else{
        h1.textContent = "Allow geolocation";
    }
    function setIcons(icon, iconId){
       const skycons = new Skycons({color: "white"}); 
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconId, Skycons[currentIcon]);
    }
});