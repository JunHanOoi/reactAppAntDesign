import React, { useState, useMemo } from 'react'
import { Tree, Typography, Table, Space, Button, Modal, Row, Col, } from 'antd';
import './Home.scss'
import { useQueryCustomers, useQueryCountry } from '../hooks/useQueryData';
// import { tableData } from './tableData';
// type HomeProps = {
//     name: string; 
//     onSOmething(   ): void
// }
// props: HomeProps

const { Title } = Typography;

function Home() {

  const [selectedTreeNode, setSelectedTreeNode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState();

  const { data: tableData, status: status } = useQueryCustomers();
  const { data: countryData } = useQueryCountry();

  console.log(countryData)

  const modalData = useMemo(() => {
    if (tableData) {
      const modalDetails = tableData.filter(((row: { id: undefined; }) =>
        row.id === customerId
      ))
      return modalDetails;
    }
    return [];
  }, [customerId])


  const selectedRowData = useMemo(() => {
    if (tableData) {
      let selectedData = tableData.filter((row: { country: string; state: string; city: string; }) =>
        row.country === selectedTreeNode || row.state === selectedTreeNode || row.city === selectedTreeNode
      );
      if (selectedData.length === 0) {
        selectedData = tableData.filter((row: { state: string; city: string; }) =>
          row.state === selectedTreeNode || row.city === selectedTreeNode
        );
      }
      return selectedData;
    }
    return [];
  }, [selectedTreeNode]);

  const showModal = (id: React.SetStateAction<undefined>) => {
    setCustomerId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectTreeNode = (selectedKeys: any, info: { node: { title: React.SetStateAction<string>; }; }) => {
    setSelectedTreeNode(info.node.title);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },

    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Pin Code',
      dataIndex: 'pinCode',
      key: 'pinCode',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { id: any; }) => (
        <Space size="middle">
          <Button type="primary" onClick={() => { showModal(record.id) }}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Title>
        Home
      </Title>
      <Space className='container'>
        <Space className='containerTreeMenu'>
          <Tree
            treeData={countryData}
            className='treeMenu'
            defaultExpandAll
            onSelect={onSelectTreeNode}
          />
        </Space>
        <Space className='containerTable'>
          <Table columns={columns} dataSource={selectedRowData.length >= 1 ? selectedRowData : tableData} className='table' />
        </Space>
        <Modal title="Customer Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {modalData.length > 0 && (
            <Space className='containerModal'>
              <Row>
                <Col span={4}>Name</Col>
                <Col span={20}>: {modalData[0].name}</Col>
              </Row>
              <Row>
                <Col span={4}>Address</Col>
                <Col span={20}>: {modalData[0].address}</Col>
              </Row>
              <Row>
                <Col span={4}>Country</Col>
                <Col span={20}>: {modalData[0].country}</Col>
              </Row>
              <Row>
                <Col span={4}>State</Col>
                <Col span={20}>: {modalData[0].state}</Col>
              </Row>
              <Row>
                <Col span={4}>City</Col>
                <Col span={20}>: {modalData[0].city}</Col>
              </Row>
              <Row>
                <Col span={4}>Pin Code</Col>
                <Col span={20}>: {modalData[0].pinCode}</Col>
              </Row>
            </Space>
          )}
        </Modal>
      </Space>

    </div>
  )
}

export default Home