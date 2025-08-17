import { useState, useEffect } from 'react';
import api from '../services/api';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await api.get('/posts');
        // setPosts(response.data);
        // This is mock data
        setPosts([
          { id: '1', user: 'nature_lover', image: 'https://via.placeholder.com/400' },
          { id: '2', user: 'foodie', image: 'https://via.placeholder.com/400' },
        ]);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading };
};

export default usePosts;
