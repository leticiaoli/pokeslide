"use strict"
import Services from "./Services"

const PokeSlide = {
  init: function () {
    this.pokeList()
  },

  slideHome: function () {
    $(".pokeSlide").slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            dots: false,
            prevArrow:
              '<img class="pokeSlide__buttom pokeSlide__buttom-prev" src="../images/seta.svg" alt="icone de seta">',
            nextArrow:
              '<img class="pokeSlide__buttom pokeSlide__buttom-next" src="../images/seta.svg" alt="icone de seta">',
          },
        },
      ],
    })
  },

  pokeList: async function () {
    const _this = this
    const pokemons = await Services.pokeApi()
    
    for(const pokemon of pokemons?.results){
      const pokeName = pokemon.name
      const pokeUrl = pokemon.url
      const pokeDetail = await Services.pokeDetail(pokeUrl)

      const pokeSvg = pokeDetail.sprites.other.dream_world.front_default
      const pokeId = pokeDetail.id
      const pokeItem = `
        <a href="/html/pokemon-page.html?pokeId=${pokeId}">
          <article class="pokeSlide__item">
            <img class="pokeSlide__item-img" src="${pokeSvg}" alt="${pokeName}" title="${pokeName}">
            <h2 class="pokeSlide__item-title"> ${pokeName} </h2>
          </article>
        </a>`
      $(".pokeSlide").append(pokeItem)
    }
      _this.slideHome()
  }
}

export default PokeSlide
