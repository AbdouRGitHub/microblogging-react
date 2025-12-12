import "../styles/HomeFeed.css"
import FeedPostEditor from "../components/FeedPostEditor.tsx";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {postsMock} from "../mocks/post.mock.ts";

function HomeFeed() {
    return (
        <>
            <main className="content">
                <div className="HomeFeed-wrap-content">
                    <FeedPostEditor/>
                    <div className="feed">
                        {
                            postsMock.map((post) => {
                                return (
                                    <PostFeedCard
                                        key={post.id}
                                        id={post.id}
                                        userId={post.account.id}
                                        content={post.content}
                                        username={post.account.username}
                                        avatarSrc={post.account.avatarUrl}
                                        createdAt={post.createdAt}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    )
        ;
}

export default HomeFeed;