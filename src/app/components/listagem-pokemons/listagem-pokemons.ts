import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { Observable } from 'rxjs';
import { PokeApiService } from '../../services/poke-api-service';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-listagem-pokemons',
  imports: [RouterLink, AsyncPipe, CardPokemon],
  templateUrl: './listagem-pokemons.html',
})
export class ListagemPokemons implements OnInit {
  public pokemons$?: Observable<Pokemon[]>;

  public pokemonsFavoritos$?: Observable<Pokemon[]>;

  public paginaAtual: number = 1;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  public readonly localStorageService = inject(LocalStorageService);
  private readonly pokeApiService = inject(PokeApiService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const paginaParam = params.get('pagina');
      let pagina = paginaParam ? parseInt(paginaParam) : 1;

      if (pagina < 1) pagina = 1;
      if (pagina > 13) pagina = 13;

      if (pagina !== (paginaParam ? parseInt(paginaParam) : 1)) {
        this.router.navigate(['/pokemons/pagina', pagina]);
        return;
      }

      this.paginaAtual = pagina;

      this.pokemons$ = this.pokeApiService.selecionarPokemons(this.paginaAtual);
      this.pokemonsFavoritos$ = this.localStorageService.selecionarFavoritos();
    });
  }
}
