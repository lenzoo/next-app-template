import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import FranchisesList from '@/components/Franchises/FranchisesList';
import CustomersListFromFranchise from '@/components/Customers/CustomersListFromFranchise';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <FranchisesList/>
      <CustomersListFromFranchise franchiseId={540} />
    </>
  );
}
