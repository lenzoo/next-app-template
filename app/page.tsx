import { Welcome } from '../components/Welcome/Welcome';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Link href="/franchises"> FranchiseList</Link>
    </>
  );
}
