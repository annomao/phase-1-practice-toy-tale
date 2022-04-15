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

  // add toys to page
  fetch("http://localhost:3000/toys")
  .then((res)=>res.json())
  .then((data)=>{
    return renderToy(data)
  })

  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit",(event)=>{
    event.preventDefault()
    const formData = {
        name: form.name.value,
        image: form.image.value,
        likes:0
      };
    
    const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      };
  
    fetch("http://localhost:3000/toys",configurationObject)
    .then((res)=>res.json())
    .then((data)=>{
      let dataList = [data]
      renderToy(dataList)
    })
    form.reset()
    toyFormContainer.style.display = "none";
  })

  function renderToy(toyList){
    toyList.forEach((toy)=>{
      let cardDiv = document.createElement("div")
      cardDiv.className = "card"

      let h2 = document.createElement("h2")
      h2.innerText = toy.name
      cardDiv.appendChild(h2)
      
      let toyImage = document.createElement("img")
      toyImage.src = toy.image
      toyImage.className = "toy-avatar"
      cardDiv.appendChild(toyImage)

      let p = document.createElement("p")
      p.innerText = toy.likes
      cardDiv.appendChild(p)

      let button = document.createElement("button")
      button.innerText = "Like"
      button.id = `${toy.id}`
      button.className = "like-btn"
      cardDiv.appendChild(button)

      document.querySelector("#toy-collection").appendChild(cardDiv)
    })
  }
  
});
