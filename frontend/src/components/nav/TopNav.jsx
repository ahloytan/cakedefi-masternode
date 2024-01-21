import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Search as SearchIcon, Menu as MenuIcon, NotificationsNone as NotificationsNoneIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import dpgc from '../../assets/dpgc.jpg';

const SIDE_NAV_WIDTH = 240;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { open } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={open}>
                <SvgIcon fontSize="small">
                  <MenuIcon  />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <NotificationsNoneIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={dpgc}
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};


TopNav.propTypes = {
  handleDrawerToggle: PropTypes.func
};


export default TopNav;