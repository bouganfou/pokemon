import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemon";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";


@Injectable()
export class PokemonService {

  constructor(private http:HttpClient) { }

  getPokemonList():Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error,[]))
    );
  }
  getPokemonById(pokemonId:number):Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response)=>this.log(response)),
      catchError(err => this.handleError(err,[]))
    );
  }

  private log(response:any){
    console.log(response);
  }
  private handleError(error:Error,errorValue:any){
    console.error(error);
    return of(errorValue);
  }

  updatePokemon(pokemon:Pokemon):Observable<null>{
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put('api/pokemons',pokemon,httpOptions).pipe(
      tap((response)=>this.log(response)),
        catchError((error)=>this.handleError(error,null))
    );
  }

  getpokemonTypeList():string[]{
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insercte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
  deletePokemonByID(pokemonId:number):Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term:string):Observable<Pokemon[]>{
    if(term.length<=1) return of([]);
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response)=>this.log(response)),
      catchError((err)=>this.handleError(err,[]))
    );
  }
}
