// MainLayout.js
import { Box } from '@mui/material';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';

const MainLayout = ({ children, isMobile, isCollapsed, setIsCollapsed }) => {
  return (
    <>
      <Sidebar isMobile={isMobile} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="content scroll-content">
        <Box className="topbar">
          <Topbar isMobile={isMobile} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Box>
        <Box m="20px">
          {children}
        </Box>
      </main>
    </>
  );
};

export default MainLayout;
