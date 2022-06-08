import React from "react";
import BasicLayout from "../layout/BasicLayout";
import * as _ from "lodash";
import { useParams } from "react-router-dom";
import AddComment from "../components/Comments/AddComment/AddComment";
import Comments from "../components/Comments/ListComments/Comments";

export default function BlogDetail(props) {
  let windowWidth = window.innerWidth;
  let { blogId } = useParams();
  return (
    <BasicLayout>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <p
          style={{
            fontSize: 35,
            fontWeight: "700",
          }}
        >
          Detail
        </p>
        <p
          style={{
            fontSize: 24,
            fontWeight: "500",
          }}
        >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.Lorem Ipk a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop puble release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.`}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 70,
        }}
      >
        {_.chunk(fakeImages.slice(0, 4), 4).map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                marginLeft: 50,
                marginRight: 50,
              }}
            >
              {item.map((_item) => {
                return (
                  <div
                    key={_item.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <img
                      src={_item.url}
                      style={{
                        width: windowWidth / 4 - 50,
                        height: windowWidth / 4 - 50,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "500",
                        marginTop: 30,
                      }}
                    >
                      {_item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="container" style={{ padding: 50 }}>
        <hr />
        <AddComment />
        <Comments />
      </div>
    </BasicLayout>
  );
}

export const fakeImages = genFakeImages();

function genFakeImages() {
  let data = [];
  for (let i = 1; i < 10; i++) {
    data.push({
      id: i,
      name: `Anh so 1`,
      url: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
    });
  }
  return data;
}
