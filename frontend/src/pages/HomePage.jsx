import { Container } from 'react-bootstrap';
import PostCard from '../components/PostCard';

export default function HomePage() {
    const samplePost = {
        id: 1,
        title: "Getting Started with React",
        author: "John Doe",
        content: "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
        createdAt: "2024-04-13T10:00:00Z",
        likes: 42,
        comments: 8
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Недавние посты</h1>
            <PostCard post={samplePost} />
        </Container>
    );
}