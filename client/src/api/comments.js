export const fetchComments = async (issue_id) => {
    const response = await fetch(`/issues/${issue_id}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
};