export type TCollection = {
  title: string;
  description: string;
  mainImg: string;
  additionalImg?: string;
  code: number;
  id: number;
};

export type TCollectionProps = {
  variant: string
} & Omit<TCollection, "code">;