import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ListagemPokemons } from './components/listagem-pokemons/listagem-pokemons';
import { DetalhesPokemon } from './components/detalhes-pokemon/detalhes-pokemon';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons/pagina/1', pathMatch: 'full' },
  { path: 'pokemons/pagina/:pagina', component: ListagemPokemons },
  { path: 'pokemons/:id', component: DetalhesPokemon },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
