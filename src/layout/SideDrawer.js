import { Link } from 'react-router-dom'
import { Hidden, styled, Toolbar, Drawer, List, Typography, Avatar } from '@material-ui/core'
import { useStorage } from '../hooks'
import userAvatar from '../images/avatar_default.jpg'
import { FaUserPlus } from 'react-icons/fa'
import { RiClipboardFill, RiLoginCircleFill } from 'react-icons/ri'

import { drawerWidth } from './DashboardLayout'
import CustomListItem from '../components/Drawer/CustomListItem'

const NavDrawerStyle = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}))

const LogoStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.green.darker,
  margin: 0,
}))

const UserCardStyle = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  backgroundColor: theme.palette.gray.light,
  margin: '12px',
  padding: '14px 12px',
  borderRadius: theme.spacing(1.5),
  textDecoration: 'none',
  '& .MuiTypography-root': {
    marginLeft: theme.spacing(1.5),
  },
}))

const ListStyle = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

// links for the side nav
const links = [
  {
    id: 'L1',
    path: '/blog',
    icon: <RiClipboardFill />,
    title: 'Blog',
  },
  { id: 'L2', path: '/login', icon: <RiLoginCircleFill />, title: 'Login' },
  { id: 'L3', path: '/register', icon: <FaUserPlus />, title: 'Register' },
]

const SideDrawer = (props) => {
  const [user, _] = useStorage('user', null)
  const drawerContent = (
    <>
      <Toolbar>
        <LogoStyle variant="h6" component="h2">
          Blogs
        </LogoStyle>
      </Toolbar>

      {user && (
        <UserCardStyle to="/" onClick={props.onClose}>
          <Avatar src={userAvatar} alt="User Image" />
          <Typography variant="subtitle1" component="h3">
            Group 1
          </Typography>
        </UserCardStyle>
      )}

      <ListStyle>
        {links.map((el) => (
          <CustomListItem
            key={el.id}
            path={el.path}
            icon={el.icon}
            title={el.title}
            onClick={props.onClose}
          />
        ))}
      </ListStyle>
    </>
  )

  return (
    <NavDrawerStyle aria-label="Navigation Panel">
      {/* Hidden 01 for sm size */}
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.toggleMenu}
          onClose={props.onClose}
          classes={{ paper: props.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {/* Drawer Component */}
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Hidden 02 for big size*/}
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: props.drawerPaper }}>
          {drawerContent}
        </Drawer>
      </Hidden>
    </NavDrawerStyle>
  )
}

export default SideDrawer
