import { useEffect, useState, useContext } from 'react';
import { initSocket, getSocket } from '../services/socket';
import { AuthContext } from '../context/AuthContext';

const useSocket = () => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user?.token) {
      const newSocket = initSocket(user.token);
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return socket;
};

export default useSocket;
