import { Card, Button, Form, Collapse } from 'react-bootstrap';
import { 
    Heart, 
    HeartFill, 
    Chat, 
    Bookmark, 
    BookmarkFill,
    PersonCircle
} from 'react-bootstrap-icons';
import { useState } from 'react';

export default function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'Jane Smith',
            content: 'Great post! Very informative.',
            createdAt: '2024-04-13T11:00:00Z'
        },
        {
            id: 2,
            author: 'Mike Johnson',
            content: 'Thanks for sharing this knowledge.',
            createdAt: '2024-04-13T12:00:00Z'
        }
    ]);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                author: 'Current User',
                content: newComment,
                createdAt: new Date().toISOString()
            };
            setComments([...comments, comment]);
            setNewComment('');
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                    <Card.Title className="mb-0">{post.title}</Card.Title>
                    <small className="text-muted">By {post.author}</small>
                </div>
                <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()}</small>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                        <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={handleLike}
                            className="d-flex align-items-center gap-1"
                        >
                            {isLiked ? <HeartFill /> : <Heart />}
                            <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </Button>
                        <Button 
                            variant={showComments ? "primary" : "outline-secondary"}
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                            className="d-flex align-items-center gap-1"
                        >
                            <Chat />
                            <span>{comments.length}</span>
                        </Button>
                        <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={handleBookmark}
                            className="d-flex align-items-center"
                        >
                            {isBookmarked ? <BookmarkFill /> : <Bookmark />}
                        </Button>
                    </div>
                </div>

                <Collapse in={showComments}>
                    <div className="mt-3">
                        <div className="mb-3">
                            {comments.map(comment => (
                                <div key={comment.id} className="mb-2 p-2 border rounded">
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <PersonCircle size={20} />
                                        <strong>{comment.author}</strong>
                                        <small className="text-muted ms-auto">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-0">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                        
                        <Form onSubmit={handleCommentSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" size="sm">
                                Post Comment
                            </Button>
                        </Form>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
} 