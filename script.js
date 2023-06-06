//built following tutorial at https://www.youtube.com/watch?v=bznJPt4t_4s

const tilesContainer = document.querySelector(".tiles"); //get the div containing the cards
const colors = ["#92780A", 
                "#BF7F04", 
                "#BF5B05", 
                "#8C1C04", 
                "#3F0E00", 
                "#F2D4AE"]; //an array of colors on the cards
const colorsPicklist = [...colors, ...colors]; //a new array containing 2 copies of the colors array
const tileCount = colorsPicklist.length; //reference to the number of tiles we have

let revealedCount = 0; //how many cards the user has matched
let activeTile = null; //the tile which the user has just clicked on
let awaitingEndOfMove = false; //waiting for clicked tiles to flip back over when no match is made


function buildTile(color){
    const element = document.createElement("div"); //create div of card

    element.classList.add("tile"); //puts tile style from css onto card
    element.setAttribute("data-color", color); //records the color applied to the element
    element.setAttribute("data-revealed", "false"); //records that a tile has been successfully matched. default is false, update to true with a match

    element.addEventListener("click", () =>{
        const revealed = element.getAttribute("data-revealed"); 

        if(awaitingEndOfMove 
            || revealed === "true" //prevents already revealed cards from being used in the next move
            || element === activeTile){  //prevents player from matching with the card they've just clicked
            return; 
        }

        element.style.backgroundColor = color; //apply the color to the clicked tile

        if(!activeTile){
            activeTile = element; //refers to the first tile clicked. we need it to check if the second tile clicked is a match

            return; 
        }
        const colorToMatch = activeTile.getAttribute("data-color"); //tells which color was clicked on

        if(colorToMatch === color){ //do the colors match
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true"); //tell the game that the 2 matched cards are no longer in play

            activeTile = null;
            awaitingEndOfMove = false; //clear out game state
            revealedCount += 2; //how many tiles have been matched

            if(revealedCount === tileCount){ //have all cards been matched
                alert("You win!");
            }
            return;
        }
        awaitingEndOfMove = true; //prevent any further tiles from being clicked on

        setTimeout(()=>{
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null; //resets ability to keep clicking
            }, 1000); //after 1000ms from click, reset tiles if they arent a match
        })

    return element;
}

for(let i = 0; i<tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length); //picks a random index from the colors array
    const color = colorsPicklist[randomIndex]; //color stored from the randomly generated index of array of colors
    const tile = buildTile(color); //we call the buildTile function, passing in our randomly generated color

    colorsPicklist.splice(randomIndex, 1);//we only want the random color pair once. so we remove the 1 element at that random index
    tilesContainer.appendChild(tile); //append these newly created div cards to the container div
}