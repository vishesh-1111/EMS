
import { useState, useEffect } from 'react';
import { Button, Drawer, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppContext } from '@/app/context/appContext';
import Image from 'next/image';

import useLanguage from '../components/uselanguage';
import logoIcon from '@/styles/bbz.jpeg'
import lgtxt from '@/styles/images/logo-text.svg';

import useResponsive from '../components/UseResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  RotateLeftOutlined,
} from '@ant-design/icons';
import { Router } from 'next/router';

const { Sider } = Layout;

export default function Navigation({user}) {
  
  const { isMobile } = useResponsive();
  
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState('');

  const translate = useLanguage();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href={'/'}>{translate('dashboard')}</Link>,
    },
  

    {
      key: 'Payment History',
      icon: <WalletOutlined />,
      label: <Link href={'/payment'}>{translate('Payment History')}</Link>,
    },

 

    {
      key: 'about',
      label: <Link href={'/about'}>{translate('about')}</Link>,
      icon: <ReconciliationOutlined />,
    },
  ];
                                                 
  
  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',

        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          // border: 'none',
          ['left']: '20px',
          top: '20px',
          // borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => ('/')}
        style={{
          cursor: 'pointer',
        }}
      >
        <Image src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />

        {!showLogoApp && (
          <p>Buri Buri..</p>
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ ['marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        // style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
