import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from '.';

export default { 
  title: 'Alert 组件',
  id: 'Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  title: 'this is alert!'
};
DefaultAlert.storyName = '基本样式';

export const DescAlert = Template.bind({});
DescAlert.args = {
  title: '需要提示标题~',
  description: 'this is a long description'
};
DescAlert.storyName = '带描述的 Alert';

export const StylesAlert = () => {
  return (
    <>
      <Alert title="this is Success!" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  );
};
StylesAlert.storyName = '不同样式的 Alert';