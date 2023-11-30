import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movies from './Movies';
import Register from './Register'
import Home from './home';
import Login from './login';
import SingleMovie from './SingleMovie'
import Error from './Error';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='movie/:id' element={<SingleMovie/>}/>
      <Route path='*' element={<Error/>}/> 
     </Routes>  
    </>
  );
}

export default App;
