import { Coin } from "./coin";

export class CoinsHolder {
  public coinList: Array<Coin> = [];
  public coinListCopy: Array<Coin> = [];
  public renderList: Array<Coin> = [];
  private n = 3;
  constructor(coins) {
    this.coinList = [...coins];
    this.coinListCopy = [...coins];
    this.renderList = [...this.coinListCopy].splice(0, this.n);
  }

  public list() {
    return this.renderList;
  }
  public searchCoin(value: string) {
    this.coinListCopy = this.coinList.filter(
      c => c.name.indexOf(value) > -1 || c.symbol.indexOf(value) > -1
    );
    this.renderList = [...this.coinListCopy].splice(0, this.n);
    return this;
  }
  public loadMore() {
    this.renderList = [...this.coinListCopy].splice(
      0,
      this.renderList.length + this.n
    );
    return this;
  }
}
