export interface PurchaseHistoryElement {
  purchaseHistoryId: string;
  userId:            string;
  amount:            number;
  status:            string;
  message:           string;
  purchaseDetail:    PurchaseDetail;
}

export interface PurchaseDetail {
  purchaseDetailId:  string;
  purchaseHistoryId: string;
  productsBought:    ProductsBought[];
  address:           string;
  city:              string;
  postalCode:        string;
  phoneNumber:       string;
  email:             string;
}

export interface ProductsBought {
  productsBoughtId: string;
  purchaseDetailId: string;
  productId:        string;
  name:             string;
  imageUrlOriginal: string;
  imageUrlSmall:    string;
  price:            number;
  quantity:         number;
  totalPrice:       number;
  selectedOptions:  SelectedOption[];
}

export interface SelectedOption {
  id:    string;
  text:  string;
  image: string;
}
