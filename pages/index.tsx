import {PrimarySearchAppBar} from "../components/navigationBar/navigationBar";
import {Home} from "../components/home/home";
import { client } from '../api'

export default function App() {

  return(
      <div>
        <header>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        </header>        
          <div style={{marginTop: 100}}>
            <Home></Home>
          </div>
      </div>
  )
}