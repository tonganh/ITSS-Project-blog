import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layout/DashboardLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'
import { useStorage } from './hooks'
import { blogList } from './api/blogApi'

const App = () => {
  useStorage('user', null)
  useStorage('users', [])
  useStorage('blogs', blogList)

  return (
    <>
      <DashboardLayout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/blog" />
          </Route>

          <Route path="/blog" component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </DashboardLayout>
    </>
  )
}

export default App
