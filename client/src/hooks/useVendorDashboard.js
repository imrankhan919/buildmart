import { useQuery } from '@tanstack/react-query';
import { getVendorData } from '../services/vendorService.js';

export default function useVendorDashboard() {
  const query = useQuery({ queryKey: ['vendor-dashboard'], queryFn: () => getVendorData() });
  const products = query.data?.products || [];
  const orders = query.data?.orders || [];
  return { ...query, products, orders };
}
