const text = document.getElementById('logout');
const options = {
    method: 'POST',
};
fetch('/api/login')
.then(response => response.json())
.then(data => {
    if(data.name)
    text.innerHTML = `Hasta luego ${data.name}`;
    else
    window.location.href = '/login';
})
.catch(error => console.log(error));

setTimeout(function(){
    fetch('/api/logout', options)
    .then(res => window.location.href = '/login')
    .catch(err => { console.log(err); })
}, 2000);