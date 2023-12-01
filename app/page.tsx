import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import CustomersListFromFranchise from '@/components/Customers/CustomersListFromFranchise';
import CustomerTable from '@/components/Customers/CustomerTable';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Link href="/franchises"> FranchiseList</Link>
    </>
  );
}
