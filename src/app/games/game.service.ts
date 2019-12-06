import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = `${environment.apiUrl}/games`;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<{ games: Game[], gameCount: number }>();

  constructor(private http: HttpClient) { }

  getGames(gamesPerPage: number, currentPage: number, filter?: string) {

    let queryParams = `?pageSize=${gamesPerPage}&page=${currentPage}`;
    if (filter) {
      queryParams = `${queryParams}&text=${filter}`;
    }

    console.log(queryParams);
    this.http.get<{ message: string, games: any, maxGames: number }>(
      `${BACKEND_URL}${queryParams}`
    )
      .pipe(map(gamesData => {
        return {
          games: gamesData.games.map(game => {
            return {
              name: game.name,
              image: game.background,
              icon: game.icon_2,
              id: game._id
            };
          }),
          maxGames: gamesData.maxGames
        };
      })
      )
      .subscribe(transformedGamesData => {
        console.log(transformedGamesData);
        this.games = transformedGamesData.games;
        this.gamesUpdated.next({
          games: [...this.games],
          gameCount: transformedGamesData.maxGames
        });
      });
  }

  getGameUpdateListenner() {
    return this.gamesUpdated.asObservable();
  }

  getGame(id: string) {
    return this.http.get<{ _id: string, name: string, background: string, icon_2: string}>(`${BACKEND_URL}/${id}`);
  }

}
