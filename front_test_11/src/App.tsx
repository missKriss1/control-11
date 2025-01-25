import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import ToolBar from './components/ToolBar/ToolBar.tsx';


const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </>
  )
};

export default App
