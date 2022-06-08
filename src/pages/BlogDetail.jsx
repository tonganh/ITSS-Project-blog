import React from "react";
import BasicLayout from "../layout/BasicLayout";
import * as _ from "lodash";
import { useParams } from "react-router-dom";
import AddComment from "../components/Comments/AddComment/AddComment";
import Comments from "../components/Comments/ListComments/Comments";
import BlogDetailContent from "../components/BlogDetails/BlogDetailContent"
import BlogDetailImage from './../components/BlogDetails/BlogDetailImage';
export default function BlogDetail(props) {
  let { blogId } = useParams();
  
  return (
    <BasicLayout>
     <BlogDetailContent/>
     <BlogDetailImage/>

      <div className="container" style={{ padding: 50 }}>
        <hr />
        <AddComment />
        <Comments />
      </div>
    </BasicLayout>
  );
}


