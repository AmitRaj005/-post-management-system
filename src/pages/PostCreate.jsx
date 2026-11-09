
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

function PostCreate({ posts, setPosts }) {
    const navigate = useNavigate();

    const handleCreate = (values) => {
        const now = new Date().toISOString();

        const newPost = {
            ...values,
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
            createdAt: now,
            updatedAt: now,
            status: "Published",
            views: 0,
            category: values.tags[0] || "General",
            color: "green",
        };

        setPosts((prev) => [newPost, ...prev]);

        navigate("/");
    };

    return (
        <PostForm
            onSubmit={handleCreate}
            buttonText="Publish post"
        />
    );
}

export default PostCreate;
