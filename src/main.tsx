import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import HomeFeed from "./pages/HomeFeed.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostDetails from "./pages/PostDetails.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import Profile from "./pages/Profile.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout/>}>
                    <Route index element={<HomeFeed/>}/>
                    <Route path=":id" element={<Profile/>}/>
                    <Route path="post">
                        <Route path=":id" element={<PostDetails/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);

