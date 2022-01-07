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
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    postToy(e.target.name.value, e.target.image.value)
  })
})

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.map(t => renderToy(t))
      //console.log(data)
    })
}

function renderToy(toy) {
  const toyCard = `<div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}Likes</p>
  <button class="like-btn">Like ❤️</button>
</div>`

  const toyBox = document.getElementById('toy-collection')
  toyBox.innerHTML += toyCard

}

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "image": url,
          "likes": 0
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
        console.log(data)
      })
  }

  function likes(e) {
    e.preventDefault()
    let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
  
        },
        body: JSON.stringify({
          "likes": more
        })
      })
      .then(res => res.json())
      .then((like_obj => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }