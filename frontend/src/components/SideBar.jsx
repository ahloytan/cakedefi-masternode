import Toolbar from '@mui/material/Toolbar';
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';
import { Web as WebIcon, GitHub, CurrencyBitcoin as CurrencyBitcoinIcon } from '@mui/icons-material';

const drawerWidth = 200;
const links = ['https://ahloytan.netlify.app/', 'https://github.com/ahloytan']
const nftLinks = ['https://sentx.io/nft-marketplace/dpgc-0.0.878200/2633', 'https://magiceden.io/collections/polygon/0x50d2915927255109570d9f72ebeb8cb477df508e']
const drawer = (
  <div>
    <Toolbar />
    <Divider/>
      <List>
        {['Portfolio', 'Github'].map((text, index) => (
          <Link href={links[index]} underline="none" target="_blank" rel="noreferrer" color="inherit" key={index}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon >
                  {index % 2 === 0 ? <WebIcon /> : <GitHub />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    <Divider/>
    <List>
        {['SentX', 'Magic Eden'].map((text, index) => (
          <Link href={nftLinks[index]} underline="none" target="_blank" rel="noreferrer" color="inherit" key={index}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon >
                  <CurrencyBitcoinIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider/>
  </div>
);

const SideBar = ({mobileOpen, handleDrawerToggle}) => {

    return (
      <>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }
          }}
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
          PaperProps={{
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }
          }}
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