import Home from '../components/home/home';
import { PrimarySearchAppBar } from '../components/navigationBar/navigationBar';
import { Preview } from '../components/preview/preview';

export default function App() {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ margin: 70 }}>
        <Home></Home>
      </div>
    </div>
  );
}
