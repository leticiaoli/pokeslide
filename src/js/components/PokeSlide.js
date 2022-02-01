"use strict";
import Services from "./Services";

const PokeSlide = {
  init: function () {
    this.pokeList();
    this.slideHome();
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
    });
  },

  pokeList: async function () {
    const pokemons = await Services.pokeApi();
    pokemons?.results.map(function (pokemon) {
      const pokeName = pokemon.name;
      const pokeUrl = pokemon.url;

      $.get(pokeUrl, function (res) {
        const pokeSvg = res.sprites.other.dream_world.front_default;
        const pokeItem = `<article class="pokeSlide__item">
                <img class="pokeSlide__item-img" src="${pokeSvg}" alt="${pokeName}" title="${pokeName}">
                <h2 class="pokeSlide__item-title"> ${pokeName} </h2>
                </article>`;
        $(".pokeSlide").append(pokeItem);
      });
    });
  },
};

export default PokeSlide;
