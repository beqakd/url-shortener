export function getAttributeValue(
  metaplexMetadata: MetaplexMetadata,
  value: string,
): string {
  const trait = metaplexMetadata.attributes.find(
    (x) => x.trait_type.toLowerCase() === value.toLowerCase(),
  );
  if (!trait?.value) throw new Error(`Invalid trait: ${value}`);

  return trait.value;
}

export function getOffChainIdFromMetadataKey(key: string): string {
  const splitKey = key.split('/');
  const splitId = splitKey[splitKey.length - 1];
  if (!splitId) throw new Error(`Invalid key: ${key}`);

  const offChainid = splitId.split('.')[0];
  if (!offChainid) throw new Error(`Invalid key: ${key}`);

  return offChainid;
}

export type AlpacaMetadataArgs = {
  imageUrl: string;
  name: string;

  description: string;
  sellerFeeBasisPoints: number;
  attributes: MetaplexAttribute[];
  collection: MetaplexCollection;
};

export type MetaplexMetadata = {
  name: string; //"Solflare X NFT",
  symbol: string;
  description: string; //"Celebratory Solflare NFT for the Solflare X launch",
  seller_fee_basis_points: number; //0,
  image: string; //"https://www.arweave.net/abcd5678?ext=png",
  animation_url?: string; // "https://www.arweave.net/efgh1234?ext=mp4",
  external_url: string; // "https://solflare.com",
  attributes: MetaplexAttribute[];
  collection: MetaplexCollection;
  properties: MetaplexProperties;
};

export type MetaplexAttribute = {
  trait_type: string;
  value: string;
};

export type MetaplexCollection = {
  name: string; // "Solflare X NFT",
  family: string; // "Solflare"
};

export type MetaplexProperties = {
  files: MetaplexFile[];
  category: 'image' | 'video' | 'image/gif';
  creators?: MetaplexCreator[];
};

export type MetaplexFile = {
  type: string;
  uri: string;
};

export type MetaplexCreator = {
  address: string;
  share: number;
};
