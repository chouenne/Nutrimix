import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import Register from './components/HomePageComponents/register'
import Login from './components/HomePageComponents/login'
import UserProfile from './components/HomePageComponents/userProfile';
import ManageAccounts from './components/HomePageComponents/ManageAccounts';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/manageAccounts" element={<ManageAccounts />} />

      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

