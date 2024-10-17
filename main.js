var map = L.map('map');
let mapContainer = document.getElementById('map');
let div = document.querySelector('.req');
let btn = document.querySelector('.req .form button');
let ip = document.querySelector('.req .form input');
let flag = false;
btn.addEventListener('click',function(){
    mapContainer.style.display = 'block';
    if(flag){
        document.querySelector('.info').remove();
    }
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ag1K2VyBK2NWKn33NP4fvbB7Yk7BW&ipAddress=${ip.value}`).then((data)=>{
        return data.json();
    })
    .then((data)=>{
        let info ={
            'ip':ip.value,
            'x' : data['location']['lat'],
            'y' : data['location']['lng'],
            'city':data['location']['city'] ,
            'country' : data['location']['country'],
            'asn':data['as']['asn'],
            'isp': data['isp'],
            'timeZone': data['location']['timezone'],
        }
        console.log(data);
        return info;
    }).then((info)=>{
        console.log(info);
        map.setView([info['x'], info['y']], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    var marker = L.marker([info['x'], info['y']]).addTo(map);
    let infoBar = document.createElement('div');
    infoBar.classList.add('info');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');
    li1.innerHTML = `
    <h2>ip Address</h2>
    <p>${info["ip"]}</p>
    `;
    li2.innerHTML = `
    <h2>Location</h2>
    <p>${info['city']},${info["country"]} ${info['asn']}</p>
    `;
    li3.innerHTML = `
    <h2>Time Zone</h2>
    <p>UTC ${info["timeZone"]}</p>
    `;
    li4.innerHTML = `
    <h2>ISP</h2>
    <p>${info["isp"]||'Unknown'}</p>
    `;
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    infoBar.appendChild(ul);
    div.appendChild(infoBar)
    flag=true;
    })
})

