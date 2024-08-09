//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"

let initial_cards = [
    
]

function hideForm(){
    document.querySelector("#myForm").classList.add('d-none')
    document.querySelector("#cards").classList.remove('d-none')
}

function hideCards(){
    document.querySelector("#myForm").classList.remove('d-none')
    document.querySelector("#cards").classList.add('d-none')
}

function getCards() {
    if(localStorage.getItem('cards') && localStorage.getItem("cards") != '[]') {
        return JSON.parse(localStorage.getItem('cards'))
    }else{
        return initial_cards
    }
  }

  function addNewCard(event){
    event.preventDefault()

    let e = document.querySelector("#email").value 
    let d = document.querySelector("#description").value 

    let cards = getCards()
    if(e && d){
        let card = { email: e, description: d}
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    this.reset()
    displayCards()
  }

  function displayCards(){
    let cards = getCards()
    let cards_html = ''
    let ndx = 0
    for(let c of cards){
        cards_html += `
        <h1 class="text-center display-4" style="color:white;">Your Request has been sent!</h1>
        <br>
        <div class="card col mb-3" data-ndx="${ndx}">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://images.unsplash.com/photo-1617668912875-7e4184d32a77?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid rounded-start" alt="image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Your Request!</h5>
                        <p class="card-text">${c.description}</p>
                        <p class="card-text">
                            <button class="btn btn-danger to-delete">Delete</button>                        
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `
        ndx++
    }

    document.querySelector("#cards").innerHTML = cards_html 

    document.querySelectorAll('.to-delete').forEach(function(btn){
        btn.onclick = function(event){
            if(confirm("Are you sure you want to delete this card?")){
                cards.splice(event.target.closest('.col').dataset.ndx, 1)
                localStorage.setItem("cards", JSON.stringify(cards))
                displayCards()
            }
        }
    })

    hideForm()
  }

  document.querySelector("#myForm").onsubmit = addNewCard
  document.querySelector("#new_card").onclick = hideCards

  document.querySelector(".to-cancel").onclick = hideForm

  displayCards()