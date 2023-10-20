import { useState } from 'react';
import { Tabs, ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate, To } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import { QueryClient, QueryClientProvider } from 'react-query';

function Nav() {

  const navigate = useNavigate();

  const [items] = useState([
    {
      key: 'home',
      label: 'Home',
    },
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'setting',
      label: 'Setting',
    },
  ]);

  const onChange = (path: To) => {
    navigate(path);
  };

  const queryClient = new QueryClient();

  return (
    <>
      <div style={{ display: 'flex' }}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  titleFontSize: 30
                }
              },
            }}
          >
            <Tabs
              tabPosition={'left'}
              tabBarStyle={{ fontSize: '30px' }}
              items={items}
              onTabClick={onChange}
            />
          </ConfigProvider>
          <Routes>
            <Route path='/home' Component={Home} />
            <Route path='/profile' Component={Profile} />
            <Route path='/setting' Component={Setting} />
          </Routes>
        </QueryClientProvider>
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <Router>
        <Nav />
      </Router>
    </>
  )
}

export default App
