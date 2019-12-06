import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  constructor(public route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });

  }

  onFilter() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value.title);
    this.gameService.getGames(10, 1, this.form.value.title);

    this.form.reset();
  }

  onReset() {
    this.form.reset();
    this.gameService.getGames(10, 1);

  }
}
