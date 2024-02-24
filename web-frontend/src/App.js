// Importing libraries
import { useSelector } from 'react-redux';

// Importing styles
import './App.css';

// Importing routes
import AppRoute from './routes';

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen min-w-screen">
      <AppRoute token={user.access_token} />
    </div>
  );
}

export default App;
