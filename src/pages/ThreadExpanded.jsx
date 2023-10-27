import { useParams } from "react-router-dom";

export default function ThreadExpanded(){

    const { threadId } = useParams();
    
    return (<div>
        <h1>Thread Expanded</h1>
    </div>)
}