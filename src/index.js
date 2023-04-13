// Code here
const apiUrl="http://localhost:3000/beers"
let beerList
const beerName=document.getElementById("beer-name")
const beerImage=document.getElementById("beer-image")
const beerDescription=document.getElementById("beer-description")
const beerReviews=document.getElementById("review-list")
const beerNameList=document.getElementById("beer-list")
function showBeerDetails(beerData){
    beerName.innerText=beerData.name
    console.log(beerData.image_url)
    beerImage.src =beerData.image_url
    beerDescription.innerText=beerData.description
    beerReviews.innerText=""
}
function showBeerReviews(beerData){
    for(item of beerData.reviews){
        const beerReviewList=document.createElement("li")
        beerReviewList.innerText=item
        beerReviews.appendChild(beerReviewList)
    }
}
function getFirstBeer(){
    fetch(`${apiUrl}/1`)
    .then(response=>response.json())
    .then(firstBeer=>{
        showBeerDetails(firstBeer)
        showBeerReviews(firstBeer)
    })
}
function showBeerNames(beerData){
    beerNameList.innerText=""
    for(item of beerData){
        const beerNameListItem=document.createElement("li")
        beerNameListItem.innerText=item.name
        beerNameList.appendChild(beerNameListItem)
    }
}
function getAllbeers(){
    fetch(apiUrl)
    .then(response=>response.json())
    .then(allBeers=>{
    showBeerNames(allBeers)
    })
}
function getSecondBeer(){
    fetch(`${apiUrl}/2`)
    .then(response=>response.json())
    .then(secondBeer=>{
        showBeerDetails(secondBeer)
        showBeerReviews(secondBeer)
    })
}
getFirstBeer()
getAllbeers()