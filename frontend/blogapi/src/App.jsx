import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

