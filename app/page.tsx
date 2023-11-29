import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import FranchisesList from '@/components/Franchises/FranchisesList';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <FranchisesList/>
    </>
  );
}
