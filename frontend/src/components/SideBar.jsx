import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WebIcon from '@mui/icons-material/Web';
import GitHub from '@mui/icons-material/GitHub';
import Drawer from '@mui/material/Drawer';

import { useState } from 'react';

const drawerWidth = 200;
const links = ['https://ahloytan.netlify.app/', 'https://github.com/ahloytan']
const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {['Portfolio', 'Github'].map((text, index) => (
        <Link href={links[index]} underline="none" target="_blank" rel="noreferrer" color="inherit" key={index}>
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <WebIcon /> : <GitHub />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
  </div>
);

const SideBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
      <>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </>
    )
  }

export default SideBar