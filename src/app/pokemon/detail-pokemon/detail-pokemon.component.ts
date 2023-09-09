import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pokemon} from "../pokemon";
import {POKEMONS} from "../mock-pokemon-list";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent  implements OnInit{
  pokemon:Pokemon|undefined;
  titre: string;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private pokemonService:PokemonService) { }
  ngOnInit(): void {
    const pokemonId:string|null=this.route.snapshot.paramMap.get('id');
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon=>this.pokemon=pokemon)
      this.titre='detail de Pokemon:'+this.pokemon?.name;
    }else{
      this.pokemon=undefined;
    }

  }
  deletePokemon(pokemon:Pokemon){
    this.pokemonService.deletePokemonByID(pokemon.id)
      .subscribe(()=>this.goToPokemonList())
  }
  goToPokemonList() {
  this.router.navigate(['/pokemons']);
  }
  goToEditPokemon(pokemon:Pokemon){
    this.router.navigate(['/edit/pokemon',pokemon.id]);
  }
}
