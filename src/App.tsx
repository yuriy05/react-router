import React, { useContext, createContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams, Link, Navigate } from 'react-router-dom';

const Home: React.FC = () => {
    return ( 
        <div className='App-header'>
            <div>
                <Link className='App-link' to="/dashboard">
                    Dashboard
                </Link>
            </div>
            <div>
                <Link className='App-link' to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}


const Login: React.FC = () => {
   const auth = useContext(AuthContext);

   const hadnleClick = () => {
        if (auth) auth.login(true)
   }
   
    return <div onClick={hadnleClick} className='App-header'>Login</div>
}

const Dashboard: React.FC = () => {
    return <div className='App-header'>Dashboard</div>
}

const Error: React.FC = () => {
    return <div className='App-header'>Error</div>
}

type ContextType = {
    isLogged: boolean;
    login: (status: boolean) => void;
}

const AuthContext = createContext<ContextType | null>(null);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const auth = useContext(AuthContext);

    if (!auth) return <Error />;

    return auth.isLogged ? <>{children}</> : <Navigate to="/login" replace/>;
}

const Profile: React.FC = () => {
    const { profileId } = useParams();

    React.useEffect(() => {
        alert(`Завантаження даних для ID: ${profileId}`)
    }, [profileId])

    return (
        <div className='App-header'>
            Profile Page ID: {profileId}
        </div>
    )
}

function App() {
  const [isLogged, login] = React.useState(false);  

  return (
    <AuthContext.Provider value={{isLogged, login}}>
   <BrowserRouter>
        <Routes>
            <Route index Component={Home}/>
            <Route path="/login" element={< Login />} />
            <Route path="/dashboard" element={<PrivateRoute>
                <Dashboard />
            </PrivateRoute>} />
            <Route path="*" Component={Error} />
            <Route path="/profile/:profileId" element={<PrivateRoute> <Profile /> </PrivateRoute>}/>
        </Routes>
   </BrowserRouter>
   </AuthContext.Provider>
  );
}

export default App;
