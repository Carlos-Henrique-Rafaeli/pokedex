import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetalhesDoPokemon } from '../../models/pokemon';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { mapeamentoDeCoresPorTipo } from '../../util/mapeamento-de-cores-por-tipo';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { Observable } from 'rxjs';
import { PokeApiService } from '../../services/poke-api-service';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-detalhes-pokemon',
  imports: [NgClass, RouterLink, AsyncPipe, DecimalPipe, CardPokemon],
  templateUrl: './detalhes-pokemon.html',
})
export class DetalhesPokemon implements OnInit {
  public detalhesDoPokemon$?: Observable<DetalhesDoPokemon>;
  public mapeamentoDeCoresPorTipo = mapeamentoDeCoresPorTipo;

  public paginaAnterior: number = 1;
  public readonly localStorageService = inject(LocalStorageService);
  private readonly route = inject(ActivatedRoute);
  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    const pokemonIdParam = this.route.snapshot.paramMap.get('id');

    if (!pokemonIdParam)
      throw new Error('Os detalhes do pokémon requisitado não foram encontrados.');

    const pokemonId = parseInt(pokemonIdParam);

    this.paginaAnterior = Math.ceil(pokemonId / 30);

    this.detalhesDoPokemon$ = this.pokeApiService.selecionarDetalhesPokemon(pokemonId);
  }
}
