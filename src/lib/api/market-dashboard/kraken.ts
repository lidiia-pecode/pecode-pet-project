export type AssetPair = {
  wsname: string;
  status: string;
};

export const fetchAssetPairs = async (): Promise<Record<string, AssetPair>> => {
  const res = await fetch('https://api.kraken.com/0/public/AssetPairs');
  const json = await res.json();
  return json.result;
};
