import { memo, useState, FC, useEffect } from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';
// import Style from '../styles/list.module.scss';
// import { useAppDispatch, useAppSelector } from '@/stores';
// import { pageIndex, pageSize, updatePage } from '@/stores/module/goods';
// import { results, totalCount } from '@/stores/module/goods';
// import { SizeType } from 'antd/es/config-provider/SizeContext';
// import { changeStatus, deleteGoods } from '@/services/api/goods';
// import UploadExcel from '../../../UploadExcel';
// interface DataType {
//   key: React.Key;
//   name: string;
//   code: string;
//   currentPrice: string;
//   originalPrice: string;
//   discount: string;
//   salesVolume: number;
//   type: string;
//   status: number;
//   hasExcel: boolean;
// }
// type Iprop = {
//   checkKeys: any[];
//   show: boolean;
//   sz: SizeType;
//   addShow: (value?: any) => void;
//   loadList: (value?: any) => void;
// };
// interface ModalProps {
//   showModal: (value: any) => void;
// }
interface ListProps {
  loadList: (value?: any) => void;
  changePage: (value?: any) => void;
  defaultColumns: ColumnsType<TableAPI.DataType>;
  tableData: any[];
  total: number;
  page: number;
  limit: number;
}
const List: FC<ListProps> = ({ defaultColumns, tableData, total, page, limit, loadList, changePage }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  //列选项数组
  const [columns, setColumns] = useState(defaultColumns);

  // const size = useAppSelector(pageSize);
  // const page = useAppSelector(pageIndex);
  // const total = useAppSelector(totalCount);
  // const data = useAppSelector(results);
  // const loadRef = useRef<ModalProps>(null);
  // const dispatch = useAppDispatch();

  // const showFn = (value: any) => {
  //   loadRef.current?.showModal(value);
  // };
  // //表格与设置按钮交互
  useEffect(() => {
    // if (checkKeys.length === 0 && show) {
    //   setColumns(defaultColumns);
    // } else if (checkKeys.length > 0 && !show) {
    //   const newColumns = columns.filter(item => checkKeys.includes(item.key));
    //   setColumns(newColumns);
    // } else if (checkKeys.length === 0 && !show) {
    //   setColumns([]);
    // } else {
    setColumns(defaultColumns);
    // }
  }, [defaultColumns]);
  // //操作表格数据

  // const updateData = (record: any) => {
  //   const { id } = record;
  //   addShow(id);
  // };

  // const deleteList = async (ids: string[]) => {
  //   try {
  //     const res = await deleteGoods({ ids });
  //     if (res.code === 200) {
  //       message.success('删除成功');
  //       loadList();
  //     } else {
  //       message.error(res.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //删除套餐
  // const deleteData = (record: any) => {
  //   const { id } = record;
  //   deleteList([id]);
  // };
  // //批量删除套餐
  // const deleteMore = () => {
  //   deleteList(selectedRowKeys as string[]);
  // };
  //监听表格选中项
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    console.log(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //表格选中配置项
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const hasSelected = selectedRowKeys.length > 0;
  //表格监听变化
  const onChange: TableProps<TableAPI.DataType>['onChange'] = pagination => {
    const { current, pageSize } = pagination;
    changePage({ current, pageSize });
    loadList({ page: current, size: pageSize });
  };
  //取消选中
  const cancelHandle = () => {
    setSelectedRowKeys([]);
  };

  return (
    <div className="content">
      {hasSelected && (
        <div className="tips">
          <div className="title">
            <span>{hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}</span>
          </div>
          <div className="cancel">
            <span onClick={cancelHandle}>取消选择</span>
          </div>
        </div>
      )}

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        // size={sz}
        pagination={{
          pageSize: limit,
          total: total,
          current: page,
          pageSizeOptions: [10, 20, 30],
          showSizeChanger: true
        }}
      />
      {hasSelected && (
        <div className="footer_bar">
          <div className="left">
            {hasSelected ? (
              <>
                <div>
                  已选择
                  <span style={{ color: '#1e93ff' }}>&nbsp;{selectedRowKeys.length} &nbsp;</span>项
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="right">
            <Button type="primary" ghost>
              批量删除
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(List);