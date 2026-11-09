
export function validatePost(values) {
    const errors = {};

    if (!values.title.trim()) {
        errors.title = "Title is required";
    }

    if (!values.author.trim()) {
        errors.author = "Author is required";
    }

    if (!values.content.trim()) {
        errors.content = "Content is required";
    } else if (values.content.trim().length < 20) {
        errors.content = "Content must be at least 20 characters";
    }

    return errors;
}
