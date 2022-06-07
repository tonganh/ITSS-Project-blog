import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input, Select, Tag, Typography } from 'antd';

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
            style={{ fontSize: "20" }}
        >
            <Typography strong level={1}>
                新しいブログの内容を記載してください
            </Typography>
            <Input.Group compact>
                <Input
                    value={name}
                    onChange={onHandleChange}
                />
                <Select defaultValue="技術" value={priority} onChange={onChangePriority}>
                    <Select.Option value='技術' label='技術'>
                        <Tag color='green'>技術</Tag>
                    </Select.Option>

                    <Select.Option value='飲食' label='飲食'>
                        <Tag color='blue'>飲食</Tag>
                    </Select.Option>

                    <Select.Option value='ファッション' label='ファッション'>
                        <Tag color='purple'>ファッション</Tag>
                    </Select.Option>

                    <Select.Option value='社会' label='社会'>
                        <Tag color='red'>社会</Tag>
                    </Select.Option>

                    <Select.Option value='スポーツ' label='社会'>
                        <Tag color='orange'>スポーツ</Tag>
                    </Select.Option>
                </Select>

                <Button
                    type="success"
                // onClick={handleClick}
                >
                    新しいブログを追加
                </Button>
            </Input.Group>

        </Modal>
    )
};

export default NewBlog;