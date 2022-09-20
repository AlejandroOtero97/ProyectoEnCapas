export async function mostrar(id, template, context) {
    const divProductos = document.getElementById(id);
    divProductos.innerHTML = await armarHtmlRemoto(template, context);
}

async function armarHtmlRemoto(url, contexto) {
    return buscarPlantilla(url).then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla);
        return generarHtml(contexto)
    })
}

async function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}


let info;
await fetch('/api/getInfo')
.then(response => response.json())
.then(data => {
    info = data;
})
.catch(error => console.log(error));
mostrar('info', 'partials/dataStats.handlebars', info);