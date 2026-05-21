import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Artist from "./components/artist";

const AppRoutes = () => (
    <BrowserRouter basename="/music-db">
        <Header/>
        <Routes>
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
);
export default AppRoutes;