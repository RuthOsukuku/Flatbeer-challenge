// Code here
"use strict"; 


const url = 'http://localhost:3000/beers'

const beerName = document.getElementById('beer-name');
const beerImage = document.getElementById('beer-image');
const beerDescription = document.getElementById('beer-description');
const beerReviews = document.getElementById('review-list');
const beerNames = document.getElementById('beer-list');
const reviewForm = document.getElementById('review-form');
const reviewFormTextArea = document.getElementById('review');
const descriptionForm = document.getElementById('description-form');
const descriptionFormTextArea = document.getElementById('description');
let selectedBeer;
let selectedBeerId;

let beersList;

const showBeerDetails = (data) => {
    selectedBeerId = data.id;
    selectedBeer = data;
    beerName.innerText = data.name;
    beerImage.src = data.image_url;
    beerDescription.innerText = data.description;
    beerReviews.innerHTML = '';
    beerNames.innerHTML = '';
    return;
}

const showBeerReviews = (data) => {
    data.reviews.forEach(element => {
        const beerReviewsLi = document.createElement('li');
        
        beerReviewsLi.innerText = element
        beerReviews.appendChild(beerReviewsLi)
        
    });
    return
}

const showListOfBeers = (data) => {
    data.forEach(element => {
        const beerNameLi = document.createElement('li');
        beerNameLi.innerText = element.name;
        beerNames.appendChild(beerNameLi);  
    });
    return
}

function updateRecord(id, updatedData) {
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(updatedData)
    })
    .then((response) => response.json())
    .then((data) => beersList = data)
}

// 1 Remove review from page when clicked
beerReviews.addEventListener('click', handleRemoveReviewClick)
// Handle Review Remove Click
function handleRemoveReviewClick(event) {
    event.preventDefault();
    event.target.remove();
    // removeReview()

}

// 2 Nav click populate main page
beerNames.addEventListener('click', handleNavClicked)
// Handle Nav Click
function handleNavClicked(event) {
    if(event.target && event.target.matches('li')) {
        let content =  event.target.textContent
        selectedBeer  = beersList.find(item =>  item.name == content )
        showBeerDetails(selectedBeer)
        showBeerReviews(selectedBeer)
        showListOfBeers(beersList)
    }
}

/////////////////////////////////////**EXTRA BONUS**////////////////////////
// 1 Add a review
reviewFormTextArea.name = 'review';
reviewForm.addEventListener('submit', handleReviewFormSubmit);

//Handle Review Form submit
function handleReviewFormSubmit(event) {
    event.preventDefault();
    // const beerReviewsLi = document.createElement('li');
    
    const formData = new FormData(reviewForm);
    reviewFormTextArea.value = '';

    const userReview = {
        'reviews': [
            ...selectedBeer.reviews,
            formData.get('review')
        ]
    }
    
    // beerReviews.appendChild(beerReviewsLi);
    updateRecord(selectedBeerId, userReview)
}

// 2 Add description
descriptionFormTextArea.name = 'description';
descriptionForm.addEventListener('submit', handleDescriptionFormSubmit);
function handleDescriptionFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(descriptionForm);

    const userDescription = {
        'description': formData.get('description')
    
    }
    
    // beerReviews.appendChild(beerReviewsLi);
    updateRecord(selectedBeerId, userDescription)
    descriptionFormTextArea.value = '';

}

// 3 Remove review
function removeReview() {
    fetch(`${url}/${selectedBeerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(beer => console.log(beer))
}

/// Fetch All beers
const getAllBeers = () => fetch('http://localhost:3000/beers').then(res => res.json()).then(data => {
    beersList = data;
    showBeerDetails(beersList[0]);
    showBeerReviews(beersList[0]);
    showListOfBeers(beersList);
})

getAllBeers()