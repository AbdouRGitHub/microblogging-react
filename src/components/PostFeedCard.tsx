import "../styles/PostFeedCard.css";
import {formatShortDate} from "../utils/formatShortDate";
import {Ellipsis, MessageSquare} from "lucide-react";
import {Link} from "react-router";

function PostFeedCard({id, content, avatarSrc, username, createdAt}: {
    id: string,
    content: string,
    username: string,
    avatarSrc: string,
    createdAt: string
}) {
    return (
        <article className="post-feed-card">
            <div className="post-feed-card-header">
                <div className="post-feed-card-header-title">
                    <Link to={`/${id}`} className="post-feed-card-avatar">
                        <img src={avatarSrc} alt="avatar"/>
                    </Link>
                    <p> {username} <span
                        style={{color: 'grey', fontSize: 'small'}}> . {formatShortDate(new Date(createdAt))}</span></p>
                </div>
                <div className="post-feed-card-options">
                    <Ellipsis size={12}/>
                </div>
            </div>
            <Link to={`/post/${id}`}
                  className="post-comment-link">
                <p className="post-feed-card-content">
                    {content}
                </p>
            </Link>
            <div className="post-feed-card-footer">
                <MessageSquare size={12} strokeWidth={2} color="#74BEDB"/>
                <p style={{color: 'grey', fontSize: 'smaller'}}>1</p>
            </div>
        </article>
    )
}

export default PostFeedCard;