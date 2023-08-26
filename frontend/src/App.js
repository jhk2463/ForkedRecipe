import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PersistLogin from "./components/PersistLogin";

import Pages from "./pages/Pages";
import Auth from "./pages/Auth";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import MyRecipes from "./pages/MyRecipes";
import SavedRecipes from "./pages/SavedRecipes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*public routes*/}
          <Route path="/*" element={<Pages />} />
          <Route path="/auth/*" element={<Auth />} />

          {/*protected routes*/}
          <Route element={<PersistLogin />}>
            <Route path="/create" element={<Create />} />
            <Route path="/editrecipe/:recipeId" element={<Edit />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path="/savedrecipes" element={<SavedRecipes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
