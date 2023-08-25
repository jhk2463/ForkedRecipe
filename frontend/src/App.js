import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Navbar from "./components/Navbar";

import Pages from "./pages/Pages";
import Auth from "./pages/Auth";
import Create from "./pages/Create";
import MyRecipes from "./pages/MyRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import Edit from "./pages/Edit";

function App() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Pages />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/savedrecipes" element={<SavedRecipes />} />
          <Route path="/editrecipe/:recipeId" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
