import "../styles/PostFeedCard.css";
import {formatShortDate} from "../utils/formatShortDate";
import {Ellipsis, MessageSquare} from "lucide-react";

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
                    <img src={avatarSrc} alt="avatar"/>
                    <p> {username} <span
                        style={{color: 'grey', fontSize: 'small'}}> . {formatShortDate(new Date(createdAt))}</span></p>
                </div>
                <div className="post-feed-card-options">
                    <Ellipsis size={12}/>
                </div>
            </div>
            <p className="post-feed-card-content">
                {content}
            </p>
            <div className="post-feed-card-footer">
                <MessageSquare size={12} strokeWidth={2} color="#74BEDB"/>
                <p style={{color: 'grey', fontSize: 'smaller'}}>1</p>
            </div>
        </article>
    )
}

export default PostFeedCard;