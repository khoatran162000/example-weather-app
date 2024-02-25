// skien được kích hoạt khi trang được load
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude; 
            let lat= position.coords.latitude; 
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=d78fd1588e1b7c0c2813576ba183a667`;

            fetch(url).then((res)=>{
                return res.json(); 
            }).then((data)=>{
                console.log(data); 
                console.log(new Date().getTime()) 
                var dat= new Date(data.dt) 
                console.log(dat.toLocaleString(undefined,'Asia/Kolkata')) 
                console.log(new Date().getMinutes()) 
                weatherReport(data); 
            })
        })
    }
})

// tìm kiếm city
function searchByCity(){
    var place= document.getElementById('input').value;
    var urlsearch= `http://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=d78fd1588e1b7c0c2813576ba183a667`;
    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data); 
    })
    document.getElementById('input').value=''; 
}


// hiển thị thông tin thời tiết cho 1 thành phố cụ thể
function weatherReport(data){
    var urlcast= `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=d78fd1588e1b7c0c2813576ba183a667`;

    fetch(urlcast).then((res)=>{
        return res.json();
    }).then((forecast)=>{
        console.log(forecast.city);
        hourForecast(forecast);
        dayForecast(forecast)
        console.log(data);

        document.getElementById('city').innerText= data.name + ', '+data.sys.country;  
        console.log(data.name,data.sys.country);

        console.log(Math.floor(data.main.temp-273));
        document.getElementById('temperature').innerText= Math.floor(data.main.temp-273)+ ' °C';

        let curr_date = document.getElementById('date');

        const days = ['Sunday', 'Monday', 'Tuesday', 'Webnesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        setInterval(() => {
            const time_cur = new Date();
            const month_cur = time_cur.getMonth();
            const date_cur = time_cur.getDate();
            const day_cur = time_cur.getDay();
            const year_cur = time_cur.getFullYear();

            curr_date.innerHTML = days[day_cur] + ', ' + date_cur + ' ' + months[month_cur] + ' ' + year_cur
        },1000);

        let icon1= data.weather[0].description;
        let iconurl= "./img/"+ icon1 +".png";
        document.getElementById('clouds').src= iconurl;
        console.log(data.weather[0].description) 

        document.querySelector('.humidity_des').innerText = data.main.humidity + '%';
        console.log(data.main.humidity)

        document.querySelector('.wind_des').innerText = Math.floor(data.wind.speed *3.6) + ' Km/h';
        
    })

}

//dự báo thời tiết theo các khung giờ tiếp theo
function hourForecast(forecast){
    document.querySelector('.templist').innerHTML='' 
    for (let i = 0; i < 6; i++) {

        var date= new Date(forecast.list[i].dt*1000) 
        console.log((date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','')) 

        let hourR=document.createElement('div');  
        hourR.setAttribute('class','next');  

        let div= document.createElement('div');
        let time= document.createElement('p'); 
        time.setAttribute('class','time') 
        time.innerText= (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00',''); 

        let temp= document.createElement('p');  
    
        temp.innerText= Math.floor((forecast.list[i].main.temp - 273))+ ' °C';

        div.appendChild(time) 
        div.appendChild(temp) 

        let desc= document.createElement('img');
        desc.setAttribute('class','desc')

        let icon2= forecast.list[i].weather[0].description;
        let iconurl2= "./img/"+ icon2 +".png";
        console.log(forecast.list[i].weather[0].description)
        desc.src= iconurl2;


        hourR.appendChild(div);
        hourR.appendChild(desc) 
        document.querySelector('.templist').appendChild(hourR);
}
}
// dự báo thời tiết trong 5 ngày tiếp theo
function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''  
    for (let i = 0; i < forecast.list.length; i+=8) { 
        console.log(forecast.list[i]); 
        let div= document.createElement('div');
        div.setAttribute('class','dayF'); 

        let day= document.createElement('p');
        day.setAttribute('class','date') 
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);
        
        let description= document.createElement('img');
        description.setAttribute('class','desc') 
        let icon3= forecast.list[i].weather[0].description;
        let iconurl3= "./img/"+ icon3 +".png";
        console.log(forecast.list[i].weather[0].description)
        description.src= iconurl3; 
        div.appendChild(description);

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'info');
        div.appendChild(div2);

        let div_humi = document.createElement('div');
        div_humi.setAttribute('class','humidity');
        div2.appendChild(div_humi);

        let icon_humi = document.createElement('img');
        icon_humi.setAttribute('class','humidity_icon');
        let iconurl4= "./img/water.png";
        icon_humi.src= iconurl4;
        div_humi.appendChild(icon_humi);

        let des_humi = document.createElement('p');
        des_humi.setAttribute('class','humidity_des1');
        des_humi.innerText = forecast.list[i].main.humidity +"%";
        console.log(forecast.list[i].main.humidity);
        div_humi.appendChild(des_humi);
        

        let temp= document.createElement('p');
        temp.setAttribute('class','temp');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div2.appendChild(temp) 

        document.querySelector('.weekF').appendChild(div) 
    }
} 