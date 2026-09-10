import { COMMISSION_RATE } from '../constants';

export interface PaymentBreakdown {
  subtotal: number;
  commission: number;
  platformFee: number;
  sellerEarnings: number;
  total: number;
}

export const calculatePaymentBreakdown = (
  price: number,
  quantity: number = 1,
  commissionRate: number = COMMISSION_RATE
): PaymentBreakdown => {
  const subtotal = price * quantity;
  const commission = subtotal * commissionRate;
  const platformFee = 0; // Could be added per transaction
  const sellerEarnings = subtotal - commission;
  const total = subtotal;

  return {
    subtotal,
    commission,
    platformFee,
    sellerEarnings,
    total,
  };
};

export const calculateSellerRating = (reviews: Array<{ rating: number }>): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const calculateResponseRate = (messagesReceived: number, messagesReplied: number): number => {
  if (messagesReceived === 0) return 100;
  return Math.round((messagesReplied / messagesReceived) * 100);
};
