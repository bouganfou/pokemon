import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon";
import {POKEMONS} from "../mock-pokemon-list";
import {Router} from "@angular/router";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit{

  pokemonList:Pokemon[] ;
  titre: string='Liste de Pokemons';

  constructor(private router:Router,
              private pokemonService:PokemonService) {
  }
  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList=> this.pokemonList=pokemonList);
  }

  goToPokemon(pokemon:Pokemon){
    this.router.navigate(['/pokemon',pokemon.id])
  }

}
