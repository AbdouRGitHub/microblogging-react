import "./styles/HomeFeed.css"
import SendPostFeedInput from "./components/SendPostFeedInput.tsx";
import PostFeedCard from "./components/PostFeedCard.tsx";
import NavigationHeader from "./components/NavigationHeader.tsx";
import type {Post} from "./models/post.model.ts";
import {postsMock} from "./mocks/post.mock.ts";

function HomeFeed() {
    const posts: Post[] = postsMock;
    return (
        <>
            <div className="app">
                <NavigationHeader/>
                <main className="content">
                    <div className="wrap-content">
                        <SendPostFeedInput/>
                        <div className="feed">
                            {
                                posts.map((post) => (
                                    <PostFeedCard key={post.id} content={post.content} username={post.account.username}
                                                  avatarSrc={post.account.avatarUrl}
                                                  createdAt={
                                                      post.createdAt
                                                  }/>
                                ))
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default HomeFeed;