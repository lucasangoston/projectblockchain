import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Home } from '../components/home/home';

export default function App() {
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ marginTop: 40 }}>
        <Home></Home>
      </div>
    </div>
  );
}
