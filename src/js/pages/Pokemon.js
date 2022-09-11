'use strict'
import Services from "../components/Services"

const Pokemon = {

    init: function () {
        this.pokemonDetail()
    },

    pokemonDetail: async function () {
        const idPokemon = window.location.search.replace('?', '').split('=')[1]

        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`

        if(!idPokemon.length){
            alert("redirect para uma página de 404")
            return
        }

        const pokeDetail = await Services.pokeDetail(pokeUrl)

        console.log(pokeDetail)

        const pokeSvg = pokeDetail.sprites.other.dream_world.front_default
        const pokeName = pokeDetail.name
        const pokeHeight = pokeDetail.height
        const pokeWeight = pokeDetail.weight

        const pokeBox = `
            <article class="pokeBox__items">
                <img class="pokeBox__img" src="${pokeSvg}" alt="${pokeName}" title="${pokeName}">
                <h2 class="pokeBox__title">${pokeName}</h2>
                <p class="pokeBox__Height">Altura: ${pokeHeight}</p>
                <p class="pokeBos__Weight">Peso: ${pokeWeight}</p>
            </article>
            `
        $(".pokeBox__details").append(pokeBox)

    }
}

export default Pokemon
