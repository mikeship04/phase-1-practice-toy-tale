let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//make a fetch request to get the toy info and render
//attach the toy cards to the div #class='card'
//add an h2 tag for name, img with src, p tag for likes, and button
//when the form is submitted, make a post request and render new toy to the dom
//hook up the like button to increase likes by 1 when clicked


function fetchToys(url){
  return fetch(url)
  .then(res => res.json())
}

function toyPersist(url, body){
  return fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
}

// function toyUpdate(url, body){
//   return fetch(url,{
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify(body),
//   })
//   .then(res => res.json())
// }


function handleToySubmission(e){
  e.preventDefault()
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  toyPersist('http://localhost:3000/toys', newToy)
  .then(createToyCard(newToy))
  alert('New toy added!')
}

//forky image for later
https://m.media-amazon.com/images/I/717JI-VXDrL._AC_SL1500_.jpg

function createToyCard(toyData) {
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  const div = document.createElement('div')

  h2.textContent = toyData.name
  p.textContent = toyData.likes
  btn.textContent = 'Like me!'
  div.className = 'card'

  img.src = toyData.image
  img.className = 'toy-avatar'

  //come back and fix
  // on 'click' get toy by.id
  //incriment the likes number by 1
  btn.addEventListener('click', (e) => {
    fetch(`http://localhost:3000/toys/${toyData.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({likes: toyData.likes +1})
    })
    .then(res=>res.json())
    .then(toy => p.textContent = toyData.likes = toy.likes)
  })


  div.append(h2,p,img,btn)
  document.querySelector('#toy-collection').append(div)
}

fetchToys('http://localhost:3000/toys')
.then(toys => toys.forEach(createToyCard))





document.querySelector('#add-toy').addEventListener('submit', handleToySubmission)