import { FC, memo, Ref, useImperativeHandle, useState, useRef } from 'react';
import { Form, Input, Modal, Button, message, Transfer } from 'antd';

import { addRole, updateRole } from '@/api/system/role';
import type { TransferProps } from 'antd';
type FieldType = {
  name: string;
  remark: string;
};
interface RecordType {
  key: string;
  title: string;
  description: string;
}
interface ModalProps {
  innerRef: Ref<{ showModal: (value?: any) => void }>;
  onLoadList: (value?: any) => void;
}
const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`
}));
// const initialTargetKeys = mockData.filter(item => Number(item.key) > 10).map(item => item.key);

const AddRole: FC<ModalProps> = ({ innerRef, onLoadList }) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef<any>();
  //将子组件上的方法暴露给父组件，类型于Vue中defineExpose({})
  useImperativeHandle(innerRef, () => ({
    showModal
  }));
  const [targetKeys, setTargetKeys] = useState<any[]>();

  const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const handleOk = () => {
    try {
      formRef.current?.validateFields().then(async (submitInfo: any) => {
        if (id) {
          console.log(submitInfo);
          const { code } = await updateRole({ id, ...submitInfo });
          if (code === 200) {
            messageApi.success('更新成功');
            onLoadList();
            setTimeout(() => {
              setVisible(false);
              setId(0);
              formRef.current?.resetFields();
            }, 100);
          } else {
            messageApi.error('更新失败');
          }
        } else {
          const { code } = await addRole(submitInfo);
          if (code === 200) {
            messageApi.success('添加成功');
            onLoadList();
            setTimeout(() => {
              setVisible(false);
              formRef.current?.resetFields();
            }, 100);
          } else {
            messageApi.error('添加失败');
          }
        }
      });
    } catch (err: any) {
      messageApi.error(err);
    }
  };
  const cancelHandle = () => {
    setVisible(false);
    formRef.current?.resetFields();
  };
  const showModal = (value: any) => {
    if (value) {
      console.log(value);
      const { title, description, id } = value;
      setId(id);
      form.setFieldsValue({ name: title, remark: description });
    }
    setVisible(true);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={id ? '修改' : '新增'}
        centered
        open={visible}
        onOk={handleOk}
        onCancel={cancelHandle}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
          <Button key="link" type="primary" onClick={cancelHandle}>
            取消
          </Button>
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          ref={formRef}
          form={form}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="角色名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              },
              {
                pattern: /^[0-9a-zA-z]{5,15}$/,
                message: '用户名格式错误'
              }
            ]}
          >
            <Input placeholder="请输入六位用户名" />
          </Form.Item>

          <Form.Item<FieldType>
            label="备注"
            name="remark"
            rules={[
              {
                required: true,
                message: '请输入姓名'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="权限" name="permisssionIds">
            <Transfer
              dataSource={mockData}
              titles={['所有权限', '赋予权限']}
              targetKeys={targetKeys}
              onChange={onChange}
              render={item => item.title}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default memo(AddRole);
