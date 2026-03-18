import styles from "../styles/PostFeedCard.module.css";
import {formatShortDate} from "../../../shared/utils/formatShortDate.ts";
import {Link} from "react-router";
import {faker} from "@faker-js/faker";
import {Bookmark, Ellipsis, Trash} from "lucide-react";
import {useState} from "react";

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
    const [ellipsisCtxMenu, setEllipsisCtxMenu] = useState<boolean>(false);
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
                <div className={styles.ellipsisContainer}>
                    <Ellipsis className={styles.ellipsis}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setEllipsisCtxMenu(!ellipsisCtxMenu);
                              }}/>
                    {
                        ellipsisCtxMenu && (
                            <div className={styles.ellipsisCtxMenu}>
                                <div className={styles.ellipsisCtxItem}><Bookmark className={styles.ellipsisCtxIcon}/> <span>Ajouter aux signets</span></div>
                                <div className={styles.ellipsisCtxItem} style={{color: "red"}}><Trash className={styles.ellipsisCtxIcon}/> <span>Supprimer le post</span></div>
                            </div>
                        )
                    }

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
                    <span
                        style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{comments} </span> commentaires
                </p>
                <p style={{color: 'grey', fontSize: 'smaller'}}>
                    <span style={{color: 'grey', fontSize: 'small', fontWeight: 'bolder'}}>{likes} </span> likes </p>
            </div>
        </article>
    )
}

export default PostFeedCard;