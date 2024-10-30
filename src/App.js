import 'bootstrap/dist/css/bootstrap.min.css';
import AllProducts from './components/AllProducts';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './components/Root';
import Cart from './components/Cart';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route path='/' element={<AllProducts />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    )
  )

  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
