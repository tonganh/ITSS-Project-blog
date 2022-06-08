import { Container } from '@material-ui/core'
import { styled } from '@material-ui/styles'

// components
import BlogHeader from '../components/Blog/BlogHeader'
import Blogs from '../components/Blog/Blogs'
import { Helmet } from 'react-helmet'

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),
}))

const Blog = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <ContainerStyle maxWidth="lg">
        {/* Header */}
        <BlogHeader />

        {/* All blogs */}
        <Blogs />
      </ContainerStyle>
    </>
  )
}

export default Blog
