
export class CoinDetails {
  public  id: string;
  public  symbol: string;
  public  name: string;

  constructor(coin) {
      this.id = coin.id;
      this.symbol = coin.symbol;
      this.name = coin.name;

  }

}
