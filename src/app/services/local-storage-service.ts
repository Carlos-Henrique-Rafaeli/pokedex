import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly chave: string = 'pokedex:favorito';

  private readonly pokemonsFavoritosSubject = new BehaviorSubject<Pokemon[]>([]);

  constructor() {
    const jsonString = localStorage.getItem(this.chave);

    if (!jsonString) return;

    this.pokemonsFavoritosSubject.next(JSON.parse(jsonString));
  }

  public alternarStatusPokemon(pokemon: Pokemon) {
    const favoritosAtuais = this.pokemonsFavoritosSubject.getValue();

    if (pokemon.favorito) {
      pokemon.favorito = false;

      const index = favoritosAtuais.findIndex((x) => x.id == pokemon.id);
      if (index > -1) favoritosAtuais.splice(index, 1);
    } else {
      pokemon.favorito = true;
      favoritosAtuais.push(pokemon);
    }

    this.pokemonsFavoritosSubject.next(favoritosAtuais);

    const jsonString = JSON.stringify(favoritosAtuais);

    localStorage.setItem(this.chave, jsonString);
  }

  public selecionarFavoritos(): Observable<Pokemon[]> {
    return this.pokemonsFavoritosSubject.asObservable().pipe(
      map((favoritos) => {
        return [...favoritos].sort((a, b) => a.id - b.id);
      }),
    );
  }
}
