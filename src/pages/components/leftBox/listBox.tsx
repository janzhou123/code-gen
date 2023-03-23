import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IProps {
    tableData: Array<any>;
}

export default function ListBox(props: IProps) {

    interface DataType {
        key: React.Key;
        tableName: string;
        tableComment: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '表名称',
            dataIndex: 'tableName',
        },
        {
            title: '描述',
            dataIndex: 'tableComment',
        },
    ];

    const data: DataType[] = [];
    let { tableData } = props;
    console.log('tableData========', tableData);
    if (tableData) {
        for (let i = 0; i < tableData.length; i++) {
            let { id, TABLE_NAME, tableComment } = tableData[i]
            data.push({
                key: id,
                tableName: TABLE_NAME,
                tableComment: tableComment,
            });
        }
    }

    console.log('data========', data);
    const App: React.FC = () => {
        const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
        const [loading, setLoading] = useState(false);

        const start = () => {
            setLoading(true);
            // ajax request after empty completing
            setTimeout(() => {
                setSelectedRowKeys([]);
                setLoading(false);
            }, 1000);
        };

        const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys);
            setSelectedRowKeys(newSelectedRowKeys);
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div >
                <div style={{ marginBottom: 16 }}>
                    <Button className='bg-sky-500' onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 200 }} />
            </div>
        );
    }

    return (
        <div className="absolute bottom-0 left-0 w-full h-1/2 border-2 border-gray-500">
            <App />
        </div >
    )
}
