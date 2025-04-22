import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

export default function CreatePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { request, loading, error, clearError } = useFetch();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !content.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', auth.userId);
            if (image) {
                formData.append('image', image);
            }

            const data = await request('/api/posts', 'POST', formData);

            if (data) {
                toast.success('Post created successfully!');
            }
        } catch (err) {
            console.error('Error creating post:', err);
        }
    };

    return (
        <Container className="py-4">
            <Card className="p-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Create New Post</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Write your post content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <Image 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        fluid 
                                        className="mt-2"
                                        style={{ maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="outline-secondary" 
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Post'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer />
        </Container>
    );
}