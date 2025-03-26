export interface ISubscription {
  subscriptionType: string | null;
  startDate: Date;
  expiredDate: Date;
  isExpired: boolean;
  id: string;
}
