export const fetchComments = async (issueId) => {
    const response = await fetch(`/api/issues/${issueId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
};