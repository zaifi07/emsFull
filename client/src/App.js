import { Route, Routes, } from 'react-router-dom';
import { } from './index.css'
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/Home';
import Protected from './protected';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<Protected />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
