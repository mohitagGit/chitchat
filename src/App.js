import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import Home from './pages/Home';
import Login from './pages/User/Login/Login';
import Account from './pages/User/Account';
import Users from './pages/User/Users';
import Folders from './pages/Folders/Folders';
import Files from './pages/Folders/Files/Files';
import Groups from './pages/Chats/Groups/Groups';
import Messages from './pages/Chats/Messages/Messages';
import PageNotFound from './pages/PageNotFound';

const Router = createBrowserRouter([
  {
    path:'/',
    element: <RootLayout/>,
    errorElement: <PageNotFound/>,
    children:[
      {
        path:'/', element: <Login/>
      },
      {
        path:'/login', element: <Login/>
      },
      {
        path:'/home', element: <Home/>
      },
      {
        path:'/account', element: <Account/>
      },
      {
        path:'/users', element: <Users/>
      },
      {
        path:'/folders', element: <Folders/>
      },
      {
        path:'/folder/:folderId/:folderName?', element: <Files/>
      },
      {
        path:'/groups', element: <Groups/>
      },
      {
        path:'/group/:groupId/:groupName?', element: <Messages/>
      }
    ]
  },
]);

function App() {
  return (
    <div>
      <AuthContextProvider>
        <RouterProvider router={Router}/>
      </AuthContextProvider>
    </div>
  );
}

export default App;