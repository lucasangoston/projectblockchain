import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Home } from '../components/home/home';

export default function App() {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ margin: 40 }}>
        <Home></Home>
      </div>
    </div>
  );
}
