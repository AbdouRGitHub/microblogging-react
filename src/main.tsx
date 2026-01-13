import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import HomeFeed from "./pages/HomeFeed.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostDetails from "./pages/PostDetails.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import Profile from "./pages/Profile.tsx";
import {type DefaultError, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProfileWithReplies from "./pages/ProfileWithReplies.tsx";
import SignIn from "./pages/SignIn.tsx";
import {HTTPError} from "ky";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: DefaultError) => {
            if (error instanceof HTTPError && error.response.status === 403) {
                //destroy cookie session JSESSIONID
                window.location.href = "/";
            }
        }
    }),
});

// This code is only for TypeScript
declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
            import("@tanstack/query-core").QueryClient;
    }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SignIn/>}/>
                    <Route element={<RootLayout/>}>
                        <Route index path="home" element={<HomeFeed/>}/>
                        <Route path=":id">
                            <Route index element={<Profile/>}/>
                            <Route path="replies" element={<ProfileWithReplies/>}/>
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

