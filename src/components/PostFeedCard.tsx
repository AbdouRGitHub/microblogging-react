import styles from "../styles/PostFeedCard.module.css";
import {formatShortDate} from "../utils/formatShortDate";
import {Link} from "react-router";
import {faker} from "@faker-js/faker";

function PostFeedCard({id, userId, content, likes, comments, username, createdAt, width = "80%"}: {
    id: string,
    userId: string,
    content: string,
    likes: number,
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
                <p style={{color: 'grey', fontSize: 'smaller'}}>
                    <span style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{comments} </span> commentaires</p>
                <p style={{color: 'grey', fontSize: 'smaller'}}>
                    <span style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{likes} </span> likes </p>
            </div>
        </article>
    )
}

export default PostFeedCard;