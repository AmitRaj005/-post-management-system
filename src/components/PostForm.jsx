
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePost } from "../utils/validators";
import { ArrowLeft, Save } from "lucide-react";

function PostForm({ initialValues, onSubmit, buttonText = "Publish post" }) {
    const navigate = useNavigate();

    const [values, setValues] = useState(
        initialValues || {
            title: "",
            author: "",
            content: "",
            tags: "",
        }
    );

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validatePost(values);

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        onSubmit({
            ...values,
            tags: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
    };

    return (
        <div className="form-page">
            <button
                className="back-btn"
                onClick={() => navigate("/")}
                type="button"
            >
                <ArrowLeft size={16} /> Back to posts
            </button>

            <div className="form-heading">
                <span>CONTENT MANAGEMENT / EDITOR</span>
                <h1>Create a new post</h1>
                <p>Share your thoughts with the world.</p>
            </div>

            <form className="post-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Post title <span>*</span></label>
                    <input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Give your post a title..."
                    />
                    {errors.title && (
                        <small className="form-error">{errors.title}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Author name <span>*</span></label>
                    <input
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                    />
                    {errors.author && (
                        <small className="form-error">{errors.author}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Content <span>*</span></label>
                    <textarea
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        placeholder="Start writing your post..."
                        rows="9"
                    />
                    <div className="character-count">
                        {values.content.length} characters (minimum 20)
                    </div>
                    {errors.content && (
                        <small className="form-error">{errors.content}</small>
                    )}
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <input
                        name="tags"
                        value={values.tags}
                        onChange={handleChange}
                        placeholder="react, design, technology"
                    />
                    <small className="field-hint">
                        Separate multiple tags with commas.
                    </small>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="primary-btn">
                        <Save size={16} />
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostForm;
