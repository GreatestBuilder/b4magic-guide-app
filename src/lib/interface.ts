interface NftAttributes {
  trait_type: string;
  value: string;
}

export interface NftMetadata {
  attributes: NftAttributes[];
  description: string;
  image: string;
  name: string;
  id?: string;
}
