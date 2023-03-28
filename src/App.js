import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
      } else {
        
      }
    });
    return unsubscribe;
  }, [])

  return (
    user ? (
    <div className="app">
      <HomeScreen />
    </div>
      ) : ( 
      <LoginScreen />
    )
  );
}

export default App;
