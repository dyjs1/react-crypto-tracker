import axios from "axios";

export const getCoins = async () => {
  const res = await axios("https://api.coinpaprika.com/v1/coins");
  return res.data;
};

export const getInfo = async (coinId: string) => {
  const res = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
  return res.data;
};

export const getPrices = async (coinId: string) => {
  const res = await axios(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  return res.data;
};

export const getCoinHistory = async (coinId: string) => {
  const res = await axios(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  return res.data;
};
