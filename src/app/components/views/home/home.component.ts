import { Component, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/services/coins.service';
import { CoinsHolder } from 'src/app/models/coinsHolder';
import { Coin } from 'src/app/models/coin';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public coins: CoinsHolder;
  public coinsList: Array<Coin> = [];

  constructor(private coinService: CoinsService) {}

  ngOnInit(): void {

    this.coinService.getCoins().subscribe(
      coins => {
        this.coins = coins;
        this.coinsList = coins.list();
      },
      error => {
        console.error('home.component ceategorysService.listenMessage', error);
      });
  }

  recieveMessage($event){
    console.log('$event:  ', $event);
    this.coinsList = this.coins.searchCoin($event).list();
  }
  loadMore($event){
    console.log('loadMore:  ', $event);
    this.coinsList = this.coins.loadMore().list();
  }

}
