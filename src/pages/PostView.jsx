
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    User,
    Pencil,
    Clock
} from "lucide-react";

function PostView({ posts }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const post = posts.find((item) => String(item.id) === id);

    if (!post) {
        return (
            <div className="form-page">
                <h2>Post not found!</h2>
                <button onClick={() => navigate("/")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const formatDate = (date) => {
        if (!date) return "Not available";

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) return date;

        return parsedDate.toLocaleString();
    };

    return (
        <div className="form-page">

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={16} /> Back to posts
            </button>

            <div className="form-heading">
                <span>CONTENT MANAGEMENT / POST DETAILS</span>
                <h1>{post.title}</h1>
                <p>View your complete post details.</p>
            </div>

            <div className="post-form">

                <p>
                    <User size={16} /> Author: {post.author}
                </p>

                <p>
                    <CalendarDays size={16} />
                    Created: {formatDate(post.createdAt || post.date)}
                </p>

                <p>
                    <Clock size={16} />
                    Updated: {formatDate(post.updatedAt || post.createdAt || post.date)}
                </p>

                <p>Status: {post.status}</p>

                <h3>Content</h3>
                <p>{post.content || "No content available."}</p>

                <h3>Tags</h3>

                <div className="post-tags">
                    {Array.isArray(post.tags) && post.tags.length > 0
                        ? post.tags.map((tag, index) => (
                            <span className="post-tag" key={index}>
                                #{tag}
                            </span>
                        ))
                        : "No tags available."
                    }
                </div>

                <div className="form-actions">
                    <button
                        className="primary-btn"
                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                    >
                        <Pencil size={16} /> Edit Post
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PostView;
