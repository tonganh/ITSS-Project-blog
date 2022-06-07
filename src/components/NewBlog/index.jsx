import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input, Select, Tag, Typography } from 'antd';

const typographyStype = {
    fontSize: "17.5px",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: "2%",
    marginTop: "4%"
}

const NewBlog = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("技術");

    const onHandleChange = (e) => setName(e.target.value);
    const onChangePriority = (value) => setPriority(value);

    const handleOk = () => setIsModalVisible(false);
    const handleCancel = () => setIsModalVisible(false);

    return (

        <Modal
            // title="新しいブログの内容を記載してください"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width="50%"
            bodyStyle={{ height: "500px" }}
        >
            <Typography
                style={{
                    fontSize: "27.5px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "4.5%"
                }}
            >
                新しいブログの内容を記載してください
            </Typography>

            {/* <Input.Group compact> */}

            <Typography style={typographyStype}>
                ブログ名
            </Typography>
            <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={name}
                onChange={onHandleChange}
                placeholder="ブログ名"
            />

            <Typography style={typographyStype}>
                ブログ内容
            </Typography>
            <Input className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={name}
                onChange={onHandleChange}
                placeholder="ブログ内容"
            />
            <br />

            <Typography style={typographyStype}>
                ブログのトピック
            </Typography>
            <Select
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                defaultValue="技術"
                value={priority}
                onChange={onChangePriority}
                fontSize="20px"
                fontWeight="bold"
            >
                <Select.Option value='技術' label='技術'>
                    <Tag color='green' fontSize="20px" fontWeight="bold">技術</Tag>
                </Select.Option>

                <Select.Option value='飲食' label='飲食'>
                    <Tag color='blue' fontSize="20px" fontWeight="bold">飲食</Tag>
                </Select.Option>

                <Select.Option value='ファッション' label='ファッション'>
                    <Tag color='purple' fontSize="20px" fontWeight="bold">ファッション</Tag>
                </Select.Option>

                <Select.Option value='社会' label='社会'>
                    <Tag color='red' fontSize="20px" fontWeight="bold">社会</Tag>
                </Select.Option>

                <Select.Option value='スポーツ' label='社会'>
                    <Tag color='orange' fontSize="20px" fontWeight="bold">スポーツ</Tag>
                </Select.Option>
            </Select>

            <br />
            <br />

            <button
                className="transition duration-200 bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block newblog_button"
                // onClick={handleClick}
                fontSize="20px"
            >
                新しいブログを追加
            </button>
            {/* </Input.Group> */}

        </Modal>
    )
};

export default NewBlog;