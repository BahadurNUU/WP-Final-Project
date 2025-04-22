import { Container } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Loader from '../components/Loader';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { request, error, loading } = useFetch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await request('/api/posts', 'GET');
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, [])

  if (loading) return <Loader />

    return (
        <Container className="py-4">
        <h1 className="mb-4">Недавние посты</h1>
        {posts && posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
            <div className="text-center">
                <h2>No posts here yet</h2>
            </div>
        )}
        </Container>
    );
}