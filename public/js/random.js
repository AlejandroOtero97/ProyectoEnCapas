import { mostrar } from './data.js';

let numbers;
document.getElementById('button').addEventListener('click', async () => {
    let number = document.getElementById('input').value;
    let query = "/api/randoms";
    if(number != "")
    {
        query = `${query}/${number}`;
    }
    await fetch(query)
    .then(response => response.json())
    .then(data => {
        numbers = data;
    })
    .catch(error => console.log(error));
    const list = [];
    Object.keys(numbers).forEach(key => {
        list.push({ key: key, cant: numbers[key] });
    });
    mostrar('numbers', 'partials/numbers.handlebars', { list });
})