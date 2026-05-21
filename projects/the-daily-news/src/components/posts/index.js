import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostById, getPostById } from "../../store/actions";
import NewsLetter from "../utils/newsletter";
import moment from "moment";
import { showToast } from "../utils/tools";
import { useParams, useNavigate } from "react-router-dom";

export const PostComponent = () => {
    const post = useSelector(state => state.posts);
    const dispatch = useDispatch();
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPostById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(post.postById === '404') {
            showToast('ERROR', "The page you requested is not available");
            navigate('/');
        }
    }, [post, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearPostById())
        }
    }, [dispatch]);

    return (
        <>
            {post.postById 
                ? <div className="article_container">
                    <h1>{post.postById.title}</h1>
                    <div
                        style={{
                            background: `url(${post.postById.imagexl})`
                        }}
                        className="image"
                    ></div>
                    <div className="author">
                        Created by: <span>{post.postById.author} -</span>
                        {moment(post.postById.createdAt).format("DD MMMM")}
                    </div>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={
                            {__html: post.postById.content}
                        }></div>
                    </div>
                </div>
                : null
            }
            <NewsLetter/>
        </>
    )
}
export default PostComponent;