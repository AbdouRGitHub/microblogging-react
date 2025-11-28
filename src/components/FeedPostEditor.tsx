import "../styles/FeedPostEditor.css"
import {Send} from "lucide-react";

function FeedPostEditor() {
    return (
        <div className="wrap-input">
            <input type="text" className="input-post" size={50} placeholder="QUOI DE NEUF?"/>
            <button className="send-post-btn">
                <Send size={20}/>
            </button>
        </div>
    )
}

export default FeedPostEditor;