import {findById} from "../mocks/post.mock.ts";
import {Link, type NavigateFunction, useNavigate, useParams} from "react-router";
import "../styles/PostDetails.css";
import {ArrowLeft, MessageSquare, Heart} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import PostFeedCard from "../components/PostFeedCard.tsx";
import {faker} from "@faker-js/faker";

function PostDetails() {
    const {id} = useParams();
    const navigate: NavigateFunction = useNavigate();

    const post = findById(id);

    return (
        <>
            <main className="content">
                <div className="PostDetails-wrap-content">
                    <div className="post-header">
                        <div className="post-header-title">
                            <a onClick={() => {
                                navigate(-1);
                            }} className="back-link">
                                <ArrowLeft/>
                            </a>
                            <h2> Post </h2>
                        </div>
                    </div>
                    <div className="post-section">
                        <div className="post-card-header">
                            <div className="post-card-header-title">
                                <Link to={`/${post?.account.id}`} className="post-feed-card-avatar">
                                    <img src={faker.image.avatar()} alt="avatar"/>
                                </Link>
                                <p>
                                    <span>{post?.account.username} </span>
                                </p>
                            </div>
                        </div>
                        <div className="post-card-body">
                            <div className="post-content">
                                <p>{post?.content}</p>
                            </div>
                            <div>
                                <p className="post-time"> Posté
                                    le {post?.createdAt ? format(new Date(post?.createdAt), "dd MMMM yyyy, hh:mm", {locale: fr}) : null}
                                </p>
                            </div>
                        </div>
                        <div className="post-card-footer">
                            <button className="post-comment-btn">
                                <MessageSquare size={22} className="post-comment-btn-icon"/>
                                <span>2 commentaires</span>
                            </button>
                            <button className="post-like-btn">
                                <Heart size={22} className="post-like-btn-icon"/>
                                <span>2 ont aimé</span>
                            </button>
                        </div>
                    </div>
                    <div className="comments-section">
                        <div className="post-comment-editor">
                            <textarea name="post-comment-textarea" className="post-comment-editor-textarea"
                                      placeholder="Qu'en pense tu ?"
                            />
                            <div>
                                <button>Envoyer</button>
                            </div>
                        </div>
                        <div className="post-comment-list">
                            {post?.replies?.map(comment => (
                                <PostFeedCard id={comment.id} userId={comment.account.id} key={comment.id}
                                              content={comment.content}
                                              username={comment.account.username}
                                              createdAt={comment.createdAt} width={"100%"}/>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PostDetails;