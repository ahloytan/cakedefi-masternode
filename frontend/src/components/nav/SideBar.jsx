import khk from '../../assets/khk.webp';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from './scrollbar.jsx';
import { SideNavItem } from './SideNavItem.jsx';
import { Web as WebIcon, GitHub, CurrencyBitcoin as CurrencyBitcoinIcon, ArrowOutward as ArrowOutwardIcon  } from '@mui/icons-material';

const items = [
  {
    title: 'Portfolio',
    path: 'https://ahloytan.netlify.app/',
    icon: (
      <SvgIcon fontSize="small">
        <WebIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Github',
    path: 'https://github.com/ahloytan',
    icon: (
      <SvgIcon fontSize="small">
        <GitHub />
      </SvgIcon>
    )
  },
  {
    title: 'SentX',
    path: 'https://sentx.io/nft-marketplace/dpgc-0.0.878200/2633',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyBitcoinIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Magic Eden',
    path: 'https://magiceden.io/collections/polygon/0x50d2915927255109570d9f72ebeb8cb477df508e',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyBitcoinIcon />
      </SvgIcon>
    )
  },
];

export const SideNav = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            href="/"
            sx={{
              display: 'inline-flex',
              height: 48  ,
              width: 48,
            }}
          >
            <img src={khk} alt="khk" className="rounded-full"/>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Percent
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                Development
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              {/* <ChevronUpDownIcon /> */}
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Want to find out more?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Click the button below!
          </Typography>
          <Button
            component="a"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowOutwardIcon />
              </SvgIcon>
            )}
            fullWidth
            sx={{ mt: 2 }}
            href='https://www.youtube.com/watch?v=fcZXfoB2f70&ab_channel=RickrollNoads'
            variant="contained"
          >
            Go
          </Button>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 240,
            overflow: 'hidden'
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 240,
          overflow: 'hidden'
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default SideNav;