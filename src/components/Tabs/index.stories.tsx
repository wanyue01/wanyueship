import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from '.';
import TabItem from './tabItem';
import Icon from '../Icon';
export default {
  title: 'Tabs组件',
  id: 'Tabs',
  component: Tabs,
  subcomponents: { 'TabItem': TabItem }
} as ComponentMeta<typeof Tabs>;

export const DefaultTabs: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabItem label="选项卡一">this is content one</TabItem>
    <TabItem label="选项卡二">this is content two</TabItem>
    <TabItem label="用户管理">this is content three</TabItem>
  </Tabs>
);
DefaultTabs.storyName = '默认的Tabs';

export const CardTabs: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args} type="card">
    <TabItem label='card1'>this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>this is content three</TabItem>
  </Tabs> 
);
CardTabs.storyName = '选项卡样式的Tabs';

export const CustomTabs: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args} type="card">
    <TabItem label={<><Icon icon="check-circle" />  自定义图标</>}>this is card one</TabItem>
    <TabItem label="tab2">this is content two</TabItem>
  </Tabs> 
);
CustomTabs.storyName = '自定义选项卡样式';
