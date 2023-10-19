import React, { useState, useMemo } from 'react'
import { Tree, Typography, Table, Space, Button, Modal } from 'antd';
import { useQuery } from 'react-query';
import './Home.scss'
// type HomeProps = {
//     name: string; 
//     onSOmething(   ): void
// }
// props: HomeProps

const { Title, Paragraph } = Typography;


function Home() {

  const [selectedTreeNode, setSelectedTreeNode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState();

  async function fetchUsers() {
    const res = await fetch('/tableData.json');
    return res.json();
  }

  const { data: tableData, status } = useQuery('customer', fetchUsers);
  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

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

  const modalData = useMemo(() => {
    const modalDetails = tableData.filter(((row: { id: undefined; }) => 
      row.id === customerId
    ))
    return modalDetails;
  }, [customerId])


  const selectedRowData = useMemo(() => {
    let selectedData = tableData.filter(((row: { country: string; state: string; city: string; }) =>
      row.country === selectedTreeNode || row.state === selectedTreeNode || row.city === selectedTreeNode
    ))
    if (selectedData.length === 0) {
      selectedData = tableData.filter((row: { state: string; city: string; }) =>
        row.state === selectedTreeNode || row.city === selectedTreeNode
      );
    }
    return selectedData;
  }, [selectedTreeNode])

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
          <Button type="primary" onClick={() => {showModal(record.id)}}>
            View
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      title: "USA",
      children: [
        {
          key: "3",
          title: "California",
          children: [
            {
              key: "7",
              title: "Los Angeles",
            },
            {
              key: "8",
              title: "San Francisco",
            },
            {
              key: "9",
              title: "San Diego",
            },
          ],
        },
        {
          key: "4",
          title: "New York",
          children: [
            {
              key: "10",
              title: "New York City",
            },
            {
              key: "11",
              title: "Buffalo",
            },
            {
              key: "12",
              title: "Rochester",
            },
          ],
        },
      ],
    },
    {
      key: "2",
      title: "Canada",
      children: [
        {
          key: "5",
          title: "Ontario",
          children: [
            {
              key: "13",
              title: "Toronto",
            },
            {
              key: "14",
              title: "Ottawa",
            },
            {
              key: "15",
              title: "Hamilton",
            },
          ],
        },
        {
          key: "6",
          title: "Quebec",
          children: [
            {
              key: "16",
              title: "Montreal",
            },
            {
              key: "17",
              title: "Quebec City",
            },
            {
              key: "18",
              title: "Laval",
            },
          ],
        },
      ],
    },
  ];

  const onSelectTreeNode = (selectedKeys: any, info: { node: { title: React.SetStateAction<string>; }; }) => {
    setSelectedTreeNode(info.node.title);
  };

  return (
    <div>
      <Title>
        Home
      </Title>
      <Space className='container'>
        <Space className='containerTreeMenu'>
          <Tree
            treeData={data}
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
              <Paragraph>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {modalData[0].name}</Paragraph>
              <Paragraph>Address&nbsp;&nbsp;: {modalData[0].address}</Paragraph>
              <Paragraph>Country&nbsp;&nbsp;: {modalData[0].country}</Paragraph>
              <Paragraph>State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {modalData[0].state}</Paragraph>
              <Paragraph>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {modalData[0].city}</Paragraph>
              <Paragraph>Pin Code&nbsp;: {modalData[0].pinCode}</Paragraph>
            </Space>
          )}
        </Modal>
      </Space>

    </div>
  )
}

export default Home