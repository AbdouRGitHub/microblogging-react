import "../styles/PostFeedCard.css";
import {formatShortDate} from "../utils/formatShortDate";
import {Ellipsis, MessageSquare} from "lucide-react";
import {Link} from "react-router";
import {faker} from "@faker-js/faker";

function PostFeedCard({id, userId, content, username, createdAt, width = "80%"}: {
    id: string,
    userId: string,
    content: string,
    username: string,
    createdAt: string,
    width?: string
}) {
    return (
        <article className="post-feed-card" style={{width: `${width}`}}>
            <div className="post-feed-card-header">
                <div className="post-feed-card-header-title">
                    <Link to={`/${userId}`} className="post-feed-card-avatar">
                        <img src={faker.image.avatar()} alt="avatar"/>
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