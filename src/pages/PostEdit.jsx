
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

function PostEdit({ posts, setPosts }) {
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

    const handleUpdate = (values) => {
        setPosts((prev) =>
            prev.map((item) =>
                String(item.id) === id
                    ? {
                        ...item,
                        ...values,
                        category: values.tags[0] || "General",
                        updatedAt: new Date().toISOString(),
                    }
                    : item
            )
        );

        navigate(`/posts/${id}`);
    };

    return (
        <PostForm
            initialValues={{
                title: post.title,
                author: post.author,
                content: post.content || "",
                tags: Array.isArray(post.tags)
                    ? post.tags.join(", ")
                    : "",
            }}
            onSubmit={handleUpdate}
            buttonText="Update post"
        />
    );
}

export default PostEdit;
