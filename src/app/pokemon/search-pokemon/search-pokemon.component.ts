import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap} from "rxjs";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit{
  //{.."a".."ab"..."abz"."ab"..."abc"....}
  searchTerms=new Subject<string>();
  //{..pokemonLis[a]..pokemonLis[ab]...}
  pokemons$: Observable<Pokemon[]>;

  constructor(private router:Router,
              private pokemonService:PokemonService) {
  }

  ngOnInit(): void {
    this.pokemons$=this.searchTerms.pipe(
      //{.."a".."ab"..."abz"."ab"..."abc"....}
      debounceTime(300),
      //{...."ab"....."ab"....."abc"....}
      distinctUntilChanged(),
      //{...."ab".........."abc"....}
      switchMap((term)=>this.pokemonService.searchPokemonList(term))
    );
    console.table(this.pokemons$);
  }

  search(term:string){
    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon:Pokemon){
    const link=['/pokemon',pokemon.id];
    this.router.navigate(link);
  }

}
