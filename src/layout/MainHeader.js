import { useState } from 'react'
import { AppBar, Box, IconButton, styled, Toolbar } from '@material-ui/core'
import { drawerWidth } from './DashboardLayout'
import { RiMenu3Line } from 'react-icons/ri'
import UserMenu from '../components/MainHeader/UserMenu'
import { useStorage } from '../hooks'
import { useSnackbar } from 'notistack'

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  color: '#333333',
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexShrink: 0,
  },
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'center',
}))

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  gridAutoFlow: 'column',
}))

const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}))

const MainHeader = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(null)

  // User Menu
  const handleOpenUserMenu = (e) => setShowUserMenu(e.currentTarget)
  const handleCloseUserMenu = () => setShowUserMenu(null)

  const [user, setUser] = useStorage('user', null)
  const { enqueueSnackbar } = useSnackbar()

  const handleSignOut = () => {
    setUser(null)
    window.location.replace('/blog')
    enqueueSnackbar('Sign out success', {
      variant: 'success',
    })
  }

  return (
    <AppBarStyle position="fixed">
      <ToolbarStyle>
        <ContainerStyle>
          <ToggleButtonStyle
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClick}
          >
            <RiMenu3Line />
          </ToggleButtonStyle>
        </ContainerStyle>

        {user && (
          <ContainerStyle>
            <UserMenu
              anchorEl={showUserMenu}
              onOpen={handleOpenUserMenu}
              onClose={handleCloseUserMenu}
              handleSignOut={handleSignOut}
            />
          </ContainerStyle>
        )}
      </ToolbarStyle>
    </AppBarStyle>
  )
}

export default MainHeader
