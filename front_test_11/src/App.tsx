import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import ToolBar from './components/ToolBar/ToolBar.tsx';
import ItemForm from './features/items/ItemForm.tsx';
import Home from './Containers/Home/Home.tsx';
import DetailedItem from './features/items/DetailedItem.tsx';


const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/add_item" element={<ItemForm/>}/>
        <Route path="/items/:itemId" element={<DetailedItem />} />
      </Routes>
    </>
  )
};

export default App
