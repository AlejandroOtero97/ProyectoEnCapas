import { normalize, schema } from 'normalizr';
import containerMongoose from '../containers/containerMongoose.js';
import { productsCollection, messagesCollection } from '../connections/mongoose.js';

const productos = new containerMongoose(productsCollection);
const mensajes = new containerMongoose(messagesCollection);

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessages = new schema.Entity('messages', { author: schemaAuthor}, { idAttribute: '_id' });

const normalizeMessages = (messages) => {
    const messagesNormalized = normalize(messages, [schemaMessages]);
    return messagesNormalized;
}

async function socketController(socket, io) {
    socket.emit('connectionToServer', {
        productsData: await productos.getAll(), 
        messagesData: normalizeMessages(await mensajes.getAll())
    });
    socket.on("enviarMensaje", async (data) => {
        await mensajes.save(data);
        io.sockets.emit('actualizarMensajes', { messagesData: normalizeMessages(await mensajes.getAll()) })
    })
    socket.on('agregarProducto', async (data) => {
        await productos.save(data);
        io.sockets.emit('actualizarTabla', { productsData: await productos.getAll() });
    })
}

export default socketController;