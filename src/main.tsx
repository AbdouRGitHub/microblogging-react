import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './assets/index.css'
import HomeFeed from "./features/home/HomeFeed.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import PostDetails from "./features/post/PostDetails.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import Profile from "./features/profile/Profile.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProfileWithReplies from "./features/profile/ProfileWithReplies.tsx";
import SignIn from "./features/auth/SignIn.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignUp from "./features/auth/SignUp.tsx";
import AuthModal from "./features/auth/components/AuthModal.tsx";
import AccountSettings from "./features/settings/AccountSettings.tsx";
import SettingsLayout from "./features/settings/layout/SettingsLayout.tsx";
import ThemeSettings from "./features/settings/ThemeSettings.tsx";
import ThemeLayout from "./layout/ThemeLayout.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            retry: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: false,
        }
    }
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
                    <Route element={<ThemeLayout/>}>
                        <Route index element={<SignIn/>}/>
                        <Route path="signUp" element={<SignUp/>}/>
                        <Route element={<RootLayout/>}>
                            <Route index path="home" element={<HomeFeed/>}/>
                            <Route path=":id">
                                <Route index element={<Profile/>}/>
                                <Route path="replies" element={<ProfileWithReplies/>}/>
                            </Route>
                            <Route path="post">
                                <Route path=":id" element={<PostDetails/>}/>
                            </Route>
                            <Route path="settings" element={<SettingsLayout/>}>
                                <Route index element={<AccountSettings/>}/>
                                <Route path="apparence" element={<ThemeSettings/>}/>
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
                <AuthModal/>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
    ,
);

