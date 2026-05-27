const container =
document.getElementById("pokemon-container");

const pokemons = [

    // FOGO

    4,5,6,37,38,58,59,77,78,
    126,146,155,156,157,
    218,219,228,229,244,250,

    // ÁGUA

    7,8,9,54,55,60,61,62,
    72,73,79,80,86,87,
    90,91,98,99,116,117,
    120,121,129,130,131,
    245
];

/* BUSCAR */

async function buscarPokemons(){

    for(const id of pokemons){

        const response =
        await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const data =
        await response.json();

        criarCard(data);
    }

    document
    .getElementById("loading")
    .style.display = "none";
}

/* CRIAR CARD */

function criarCard(pokemon){

    const card =
    document.createElement("div");

    card.classList.add("card");

    const tiposPokemon =
    pokemon.types.map(
        t => t.type.name
    );

    // TIPO

    if(tiposPokemon.includes("fire")){
        card.classList.add("fire");
    }

    if(tiposPokemon.includes("water")){
        card.classList.add("water");
    }

    // IMG

    const imagem =
    document.createElement("img");

    imagem.src =
    pokemon.sprites.other[
        "official-artwork"
    ].front_default;

    // NOME

    const nome =
    document.createElement("h2");

    nome.textContent =
    pokemon.name;

    // INFO

    const info =
    document.createElement("div");

    info.classList.add("info");

    // TIPOS

    const tipos =
    pokemon.types
    .map(
        tipo =>
        tipo.type.name.toUpperCase()
    )
    .join(" / ");

    const tipo =
    document.createElement("p");

    tipo.textContent =
    tipos;

    tipo.classList.add("tipo");

    // NUMERO

    const numero =
    document.createElement("p");

    numero.textContent =
    "Pokédex Nº " + pokemon.id;

    numero.classList.add("numero");

    // STATS

    const hp =
    pokemon.stats[0].base_stat;

    const attack =
    pokemon.stats[1].base_stat;

    const defense =
    pokemon.stats[2].base_stat;

    const stats =
    document.createElement("div");

    stats.classList.add("stats");

    stats.innerHTML = `

    <div class="stat">
        <span>HP</span>
        <div class="bar">
            <div class="fill hp-fill"
            style="width:${hp}%">
            </div>
        </div>
    </div>

    <div class="stat">
        <span>ATK</span>
        <div class="bar">
            <div class="fill atk-fill"
            style="width:${attack}%">
            </div>
        </div>
    </div>

    <div class="stat">
        <span>DEF</span>
        <div class="bar">
            <div class="fill def-fill"
            style="width:${defense}%">
            </div>
        </div>
    </div>
    `;

    // APPEND

    info.appendChild(tipo);
    info.appendChild(numero);
    info.appendChild(stats);

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(info);

    // CLICK

    card.addEventListener("click", () => {

        abrirModal(
            pokemon,
            tipos,
            tiposPokemon
        );
    });

    container.appendChild(card);
}

/* ABRIR MODAL */

function abrirModal(
    pokemon,
    tipos,
    tiposPokemon
){

    const modal =
    document.getElementById("modal");

    const modalContent =
    document.querySelector(".modal-content");

    // RESET

    modalContent.classList.remove(
        "fire-animation",
        "water-animation"
    );

    // ANIMAÇÃO

    if(tiposPokemon.includes("fire")){
        modalContent.classList.add(
            "fire-animation"
        );
    }

    if(tiposPokemon.includes("water")){
        modalContent.classList.add(
            "water-animation"
        );
    }

    // DADOS

    document
    .getElementById("modal-img")
    .src =
    pokemon.sprites.other[
        "official-artwork"
    ].front_default;

    document
    .getElementById("modal-name")
    .textContent =
    pokemon.name.toUpperCase();

    document
    .getElementById("modal-type")
    .textContent =
    "Tipo: " + tipos;

    document
    .getElementById("modal-height")
    .textContent =
    "Altura: " + pokemon.height;

    document
    .getElementById("modal-weight")
    .textContent =
    "Peso: " + pokemon.weight;

    document
    .getElementById("modal-ability")
    .textContent =
    "Habilidade: " +
    pokemon.abilities[0]
    .ability.name;

    // MOSTRAR

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}

/* FECHAR */

function fecharModal(){

    const modal =
    document.getElementById("modal");

    modal.classList.add("hidden");

    document.body.style.overflow = "auto";
}

/* X */

document
.getElementById("close")
.addEventListener(
    "click",
    fecharModal
);

/* CLICAR FORA */

document
.getElementById("modal")
.addEventListener("click", (e) => {

    if(
        e.target.id === "modal"
    ){
        fecharModal();
    }
});

/* ESC */

document.addEventListener(
    "keydown",
    (e) => {

        if(e.key === "Escape"){
            fecharModal();
        }
    }
);

/* PESQUISA */

const search =
document.getElementById("search");

search.addEventListener(
    "input",
    () => {

        const valor =
        search.value.toLowerCase();

        const cards =
        document.querySelectorAll(".card");

        cards.forEach(card => {

            const nome =
            card.querySelector("h2")
            .textContent
            .toLowerCase();

            if(nome.includes(valor)){

                card.style.display =
                "block";

            }else{

                card.style.display =
                "none";
            }
        });
    }
);

buscarPokemons();