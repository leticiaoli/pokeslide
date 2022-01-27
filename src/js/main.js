'use strict'
const body = $('body')

//Pages import
import Pokemon from './pages/Pokemon'

//Components import
import PokeSlide from './components/PokeSlide'

//Pages
if(body.hasClass('home-page')){
    PokeSlide.init()
}

if(body.hasClass('pokemon-page')){
    Pokemon.init()
}

