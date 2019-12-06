import { GameService } from './../game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../game.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  isLoading = false;
  games: Game[] = [];
  totalGames = 0;
  gamesPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 30, 40, 50];

  private gamesSub: Subscription;

  constructor(private gamesService: GameService) { }

  ngOnInit() {
    this.isLoading = true;
    this.gamesService.getGames(this.gamesPerPage, this.currentPage);
    this.gamesSub = this.gamesService.getGameUpdateListenner()
      .subscribe((gamesData: { games: Game[], gameCount: number }) => {
        this.isLoading = false;
        this.totalGames = gamesData.gameCount;
        console.log(this.totalGames);
        this.games = gamesData.games;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.gamesPerPage = pageData.pageSize;
    this.gamesService.getGames(this.gamesPerPage, this.currentPage);
  }

  getImage(imagePath: string) {
    let image = '';

    if (imagePath) {
      image = imagePath;
    } else {
      image = '../../../assets/404.svg';
    }

    return image;
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }
}
