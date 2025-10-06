import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { RouterLink } from '@angular/router';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { alternarStatusPokemon, pokemonsFavoritos } from '../../util/pokemon-favoritos';
import { Observable } from 'rxjs';
import { PokeApiService } from '../../services/poke-api-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, AsyncPipe, CardPokemon],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public pokemons$?: Observable<Pokemon[]>;

  public pokemonsFavoritos = pokemonsFavoritos;
  public alternarStatusPokemon = alternarStatusPokemon;

  public readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    this.pokemons$ = this.pokeApiService.selecionarPokemons();
  }
}
