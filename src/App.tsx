import { useState } from 'react';
import { Tabs, ConfigProvider } from 'antd';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Setting from './pages/Setting';

function App() {

  const [items] = useState([
    {
      key: '1',
      label: 'Home',
      children: <Home />
    },
    {
      key: '2',
      label: 'Profile',
      children: <Profile />
    },
    {
      key: '3',
      label: 'Setting',
      children: <Setting />
    },
  ]);

  return (
    <>
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
        />
      </ConfigProvider>
    </>
  )
}

export default App
