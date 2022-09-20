const socket = io();
const { denormalize, schema } = normalizr;
import { mostrar } from './../js/data.js';

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessages = new schema.Entity('messages', {
    author: schemaAuthor
}, { idAttribute: '_id' });

const denormalizeMessages = (messages) => {
    const messagesDenormalized = denormalize(messages.result, [schemaMessages], messages.entities);
    return messagesDenormalized;
}

socket.on('connectionToServer', async ({ productsData, messagesData }) => {
    await mostrar('formProducts', 'partials/products.handlebars', {});
    await mostrar('mensajes', 'partials/messages.handlebars', {});
    await updateProducts(productsData);
    await updateMessages(messagesData);
    getProductsData();
    getMessagesData();
    loginSession();
});

socket.on('actualizarTabla', ({ productsData }) => {
    updateProducts(productsData);
});

socket.on('actualizarMensajes', ({ messagesData }) => {
    updateMessages(messagesData);
})

const loginSession = () => {
    const cartel = document.getElementById('titleWelcome');
    let nombre;
    const options = {
        method: 'GET',
    };
    fetch('/api/login', options)
    .then(res => res.json())
    .then(data => {
        nombre = data.name;
        cartel.innerHTML = `Bienvenido ${nombre}`;
    })
    .catch(err => { console.log(err); })

    const boton = document.getElementById("buttonLogout")
    boton.addEventListener('click', event => {
        window.location.href = '/logout';
    })
}

const updateProducts = async (productsData) => {
    productsData = productsData.map( item => {
        const id = item._id;
        delete item._id;
        return { ...item, id: id, }; 
    });
    let context = { titulo:"Productos", productsData, productsCount: productsData.length > 0, total: productsData.length };
    mostrar('tableProducts', 'partials/result.handlebars', context);
}

const updateMessages = async (messagesData) => {
    const mensajesDenormalized = denormalizeMessages(messagesData);
    const compresion = (JSON.stringify(messagesData).length) * 100 /JSON.stringify(mensajesDenormalized).length;
    let context = { messagesData: mensajesDenormalized, messagesCount: mensajesDenormalized.length > 0, titulo: `Porcentaje de Compresion: ${compresion.toFixed(2)}%` }
    await mostrar('tableMensajes', 'partials/chat.handlebars', context);
}

function getProductsData() {
    const btn = document.getElementById('botonEnviar')
    btn.addEventListener('click', event => {
        const title = document.getElementById('title').value
        const price = document.getElementById('price').value
        const thumbnail = document.getElementById('thumbnail').value
        if(title.length>0 && price.length>0 && thumbnail.length>0){
            socket.emit('agregarProducto', { title, price, thumbnail })
        } else {
            alert('Todos los campos son obligatorios')
        }
    })
}

function getMessagesData() {
    const btn2 = document.getElementById("botonEnviarMensaje")
    btn2.addEventListener('click', event => {
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = document.getElementById('edad').value;
        const alias = document.getElementById('alias').value;
        const avatar = document.getElementById('avatar').value;
        const mensaje = document.getElementById('mensaje').value;
        const fecha = new Date();
        const fechaString = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        if( email.length>0 &&
            nombre.length>0 &&
            apellido.length>0 &&
            edad.length>0 &&
            alias.length>0 &&
            avatar.length>0 &&
            mensaje.length>0){
            const data = {
                author: {
                    email: email, 
                    nombre: nombre, 
                    apellido: apellido, 
                    edad: edad, 
                    alias: alias,
                    avatar: avatar
                },
                text: mensaje,
                dateString: fechaString
            }
            socket.emit('enviarMensaje', data)
        }
        else{
            alert('Todos los campos son obligatorios')
        }
    })
}



