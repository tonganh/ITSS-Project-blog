import {
  Button,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl
} from "@mui/material"

import { Box as MUIBox } from "@mui/material";
import { styled } from '@material-ui/styles'
import { Box } from '@mui/system'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useStorage } from '../../hooks'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 450,
  bgcolor: 'white',
  border: 1,
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const BoxStyle = styled(Box)(({ theme }) => ({
  // root
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  // h3
  '& .MuiTypography-h3': {
    fontSize: 30,
    fontWeight: 500,
  },

  // button style
  '& .MuiButton-contained': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: 'capitalize',
    padding: `${theme.spacing(0.75)}px ${theme.spacing(2)}px`,
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      boxShadow: 'none',
    },
  },

  // text after the + icon
  '& .text': {
    marginLeft: theme.spacing(0.5),
  },
}))

const BlogHeader = () => {

  const [user, _] = useStorage('user', null);
  const [blogList, setBlogList] = useStorage('blogs',[]);
  // const [newBlog, setNewBlog] = useState({
  //   dateTime: '2022年 6月 9日',
  //   title: '',
  //   topic: '',
  //   path: '#',
  //   social: { comment: '0', views: '0', share: '0' },
  // });
  const [open, setOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogTopic, setBlogTopic] = useState('');

  const onOpenModal = () => setOpen(!open);
  const onChangeBlogTitle = (e) => setBlogTitle(e.target.value);
  const onChangeBlogTopic = (e) => setBlogTopic(e.target.value);

  const onCreateNewBlog = () => {
    const newBlog = {
      dateTime: '2022年 6月 9日',
      title: '',
      topic: '',
      path: '#',
      social: { comment: '0', views: '0', share: '0' },
    }
    newBlog.title = blogTitle;
    newBlog.topic = blogTopic;
    setBlogList([...blogList, newBlog]);
    setOpen(!open);
    setBlogTitle('');
    setBlogTopic('');
  }

  return (
    <>
      <BoxStyle>
        <Typography variant="h3">ブログ</Typography>

        {user && (
          <Button variant="contained" color="success" href="#" onClick={onOpenModal}>
            <AiOutlinePlus fontSize="large" /> <span className="text">新ブログを追加</span>
          </Button>
        )}
      </BoxStyle>

      <Modal
        open={open}
        onClose={onOpenModal}
      >
        <MUIBox sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight="bold"
            textAlign="center"
          >
            新しいブログを記載してください
          </Typography>

          <MUIBox
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: "5%"
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px", marginBottom: "2.5%" }}>
              ブログ名
            </Typography>
            <TextField
              id="outlined-password-input"
              placeholder="ブログ名"
              type="text"
              sx={{ width: "100%" }}
              value={blogTitle}
              onChange={onChangeBlogTitle}
            />
          </MUIBox>

          <MUIBox
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: "10%",
              marginBottom: "7.5%"
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              ブログのトピック
            </Typography>
            <MUIBox sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <Select
                  value={blogTopic}
                  onChange={onChangeBlogTopic}
                >
                  <MenuItem value='技術'>技術</MenuItem>
                  <MenuItem value='社会'>社会</MenuItem>
                  <MenuItem value='音楽'>音楽</MenuItem>
                  <MenuItem value='スポーツ'>スポーツ</MenuItem>
                </Select>
              </FormControl>
            </MUIBox>
          </MUIBox>

          <Button
            onClick={onCreateNewBlog}
            variant='contained'
            color='success'
            sx={{
              marginLeft: "25%",
              marginTop: "7.5%",
              marginBottom: "5%",
              width: "50%",
              height: "10%",
              fontSize: "18px",
            }}
          >
            新規ブログを追加
          </Button>

        </MUIBox>
      </Modal>
    </>
  )
}

export default BlogHeader
