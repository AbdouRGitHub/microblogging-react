import styles from "../styles/PostFeedCard.module.css";
import {formatShortDate} from "../utils/formatShortDate";
import {Heart, MessageSquare} from "lucide-react";
import {Link} from "react-router";
import {faker} from "@faker-js/faker";

function PostFeedCard({id, userId, content, likes, liked, comments, username, createdAt, width = "80%"}: {
    id: string,
    userId: string,
    content: string,
    likes: number,
    liked: boolean,
    comments: number,
    username: string,
    createdAt: string,
    width?: string
}) {
    return (
        <article className={styles.card} style={{width: `${width}`}}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Link to={`/${userId}`} className={styles.avatarLink}>
                        <img src={faker.image.avatar()} className={styles.avatarImage} alt="avatar"/>
                    </Link>
                    <p> {username} <span
                        style={{color: 'grey', fontSize: 'small'}}> . {formatShortDate(new Date(createdAt))}</span></p>
                </div>
            </div>
            <Link to={`/post/${id}`}
                  className={styles.link}>
                <p className={styles.content}>
                    {content}
                </p>
            </Link>
            <div className={styles.footer}>
                <MessageSquare size={16} strokeWidth={2} color="#74BEDB"/>
                <p style={{color: 'grey', fontSize: 'smaller', fontWeight: 'bolder'}}>{comments}</p>
                <Heart size={17} strokeWidth={2} color="#FE7918"/>
                <p style={{color: 'grey', fontSize: 'smaller', fontWeight: 'bolder'}}>{likes}</p>
            </div>
        </article>
    )
}

export default PostFeedCard;