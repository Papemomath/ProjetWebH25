import { useParams } from "react-router-dom";
import "./StreamingPage.css";

export default function StreamingPage() {

    const {type, id, saison, episode} = useParams()

    return (
        <div className="stream-container">
            {/* <h1>The Streaming Page</h1> */}
            {
                type == "movie" ? 
                <iframe
                src={`https://www.vidking.net/embed/${type}/${id}`}
                width="100%"
                height="600"
                frameBorder="0"  
                allowFullScreen 
                title="Streaming Video"
            ></iframe>
            :
            // a gérer pour les saisonn et episode
            <iframe
                src={`https://www.vidking.net/embed/${type}/${id}/${saison}/${episode}`}
                width="100%"
                height="600"
                frameBorder="0"  
                allowFullScreen 
                title="Streaming Video"
            ></iframe>
            }
        </div>
    );
}
