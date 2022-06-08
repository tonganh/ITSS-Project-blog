import React from "react";
import * as _ from "lodash";

export default function BlogDetailImage(props) {
  let windowWidth = window.innerWidth;

  return(
  <div
  style={{
    display: "flex",
    flexDirection: "column",
    marginTop: 70,
  }}
>
  {_.chunk(fakeImages, 4).map((item, index) => {
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
</div>)
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