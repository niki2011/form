import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-list-coins',
  templateUrl: './list-coins.component.html',
  styleUrls: ['./list-coins.component.scss']
})
export class ListCoinsComponent implements OnInit {

  @Input() coinsList: Array<Coin> = [];
  @Output() messageEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    console.log('coinsList:  ', this.coinsList);
  }

  loadMore() {
    this.messageEvent.emit();
  }

}
