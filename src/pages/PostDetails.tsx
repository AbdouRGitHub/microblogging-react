import {postsMock} from "../mocks/post.mock.ts";
import {commentsMock} from "../mocks/comment.mock.ts";
import {Link, useParams} from "react-router";
import "../styles/PostDetails.css";
import {ArrowLeft, MessageSquare, Heart} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

function PostDetails() {
    const {id} = useParams();
    const post = postsMock.find(p => p.id === id);
    const comments = commentsMock.filter(c => c.post.id === id);
    console.log("post: ", post);
    console.log("comments: ", comments);
    return (
        <>
            <div className="content">
                <div className="wrap-content">
                    <div className="post-header">
                        <div className="post-header-title">
                            <Link to="/" className="back-link">
                                <ArrowLeft/>
                            </Link>
                            <h2> Post </h2>
                        </div>
                    </div>
                    <div className="post-section">
                        <div className="post-card-header">
                            <div className="post-card-header-title">
                                <Link to={`/${post?.account.id}`} className="post-feed-card-avatar">
                                    <img src={post?.account.avatarUrl} alt="avatar"/>
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
                                    le {format(new Date(post?.createdAt || 'null'), "dd MMMM yyyy, hh:mm", {locale: fr})}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetails;