export interface PostDeliveryData {
  address:        string;
  city:           string;
  postalCode:     string;
  phoneNumber:    string;
  email:          string;
  name:           string;
  lastName:       string;
  secondLastName: string;
}
export interface DeliveryData {
  id:          string;
  address:     string;
  city:        string;
  postalCode:  string;
  phoneNumber: string;
  email:       string;
  userId:      string;
  user:        User;
}

export interface User {
  name:                 string;
  lastName:             string;
  secondLastName:       string;
  active:               boolean;
  deleted:              boolean;
  refreshToken:         string;
  id:                   string;
  userName:             string;
  normalizedUserName:   string;
  email:                string;
  normalizedEmail:      string;
  emailConfirmed:       boolean;
  passwordHash:         string;
  securityStamp:        string;
  concurrencyStamp:     string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled:     boolean;
  lockoutEnabled:       boolean;
  accessFailedCount:    number;
}
