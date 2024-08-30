export interface Banner {
  id:               string;
  assetUrl?:         string;
  assetName?:        string | null;
  assetDescription?: string | null;
  location:         string;
  createdAt:        Date;
  updatedAt:        Date;
  link? :string | null;
}
