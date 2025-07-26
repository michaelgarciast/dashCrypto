export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume?: number;
  market_cap_rank?: number;
  circulating_supply?: number;
}
