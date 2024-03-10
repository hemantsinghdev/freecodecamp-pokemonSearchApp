const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imageDiv = document.querySelector(".show-section .image-sec .image");
const featuresDiv = document.querySelector(".show-section .features-sec");
const stats = {
  pokemonName: document.getElementById("pokemon-name"),
  pokemonId: document.getElementById("pokemon-id"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  types: document.getElementById("types"),
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  'special-attack': document.getElementById("special-attack"),
  'special-defense': document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
};

const emptyData = {
    name: "",
    id: "",
    weight: "?",
    height: "?",
    sprites: {front_default: "https://img.freepik.com/free-vector/modern-question-mark-template-idea-message-vector_1017-47932.jpg?w=826&t=st=1710054310~exp=1710054910~hmac=1c818de3d37e5df8c25de776ab55133639a8b00a4381782bd4264b6d0d8b0791"},
    types: [],
    stats: [{base_stat:"?", stat:{name:"hp"}},
            {base_stat:"?", stat:{name:"attack"}},
            {base_stat:"?", stat:{name:"defense"}},
            {base_stat:"?", stat:{name:"special-attack"}},
            {base_stat:"?", stat:{name:"special-defense"}},
            {base_stat:"?", stat:{name:"speed"}}
    ]
};

const pokemonApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const getPokemon = () => {
    const value = searchInput.value;
    const url = `${pokemonApi}/${value.toLowerCase()}`;
    fetchData(url);
}

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    changeUI(data);
  } catch (err) {
    alert("Enter a Valid Name or Id");
    changeUI(emptyData);
    console.log(err);
  }
};

const changeUI = (data) => {
    featuresDiv.innerHTML = "";
    stats.pokemonName.textContent = data.name;
    if(data.id !== ""){
        stats.pokemonId.textContent = `#${data.id}`;
    } else {
        stats.pokemonId.textContent = "";
    }
    stats.weight.textContent = data.weight;
    stats.height.textContent = data.height;
    imageDiv.innerHTML = `<img src="${data.sprites.front_default}" alt="${data.name} image" id="sprite"/>`;
    for(let type of data.types){
        const name = type.type.name;
        featuresDiv.innerHTML += `<button>${name}</button>`;
    };
    for(let stat of data.stats){
        const val = stat.base_stat;
        const statName = stat.stat.name;
        stats[statName].textContent = val;
    }
}

searchBtn.addEventListener("click", getPokemon);