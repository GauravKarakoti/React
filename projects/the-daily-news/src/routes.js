import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from './components/home';
import Header from "./components/header";
import MainLayout from "./hoc/mainLayout";
import Contact from "./components/contact";
import PostComponent from "./components/posts";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <MainLayout>
                <Routes> 
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/article/:id" element={<PostComponent />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default AppRoutes;