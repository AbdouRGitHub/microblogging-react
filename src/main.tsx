import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import HomeFeed from "./pages/HomeFeed.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostDetails from "./pages/PostDetails.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import Profile from "./pages/Profile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: false,
        }
    }
});
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route index element={<HomeFeed/>}/>
                        <Route path=":id">
                            <Route index element={<Profile/>}/>
                            {/*
                        <Route path="replies" element={<ProfileWithReplies/>}/>
                        <Route path="likes" element={<ProfileWithLikes/>}/>
                        */}
                        </Route>
                        <Route path="post">
                            <Route path=":id" element={<PostDetails/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);

