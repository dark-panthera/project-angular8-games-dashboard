import { Game } from './../game.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  // tslint:disable-next-line:no-inferrable-types
  isLoading: boolean = false;
  private gameId: string;
  game: Game;

  constructor(private gameService: GameService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {

        this.gameId = paramMap.get('id');

        this.isLoading = true;
        this.gameService.getGame(this.gameId)
          .subscribe(gameData => {
            console.log(gameData);
            this.isLoading = false;
            this.game = {
              id: gameData._id,
              name: gameData.name,
              image: gameData.background,
              icon: gameData.icon_2,
            };

            console.log(this.game.name);
          });
      }
    });
  }

}
