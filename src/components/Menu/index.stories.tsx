import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from '.';

const menuMeta: ComponentMeta<typeof Menu> = {
  title: 'Menu组件',
  // id: 'Menu',
  component: Menu,
  subcomponents: { 'SubMenu': Menu.SubMenu, 'Item': Menu.Item }
};
export default menuMeta;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu  {...args} >
    <Menu.Item>
      cool link
    </Menu.Item>
    <Menu.Item>
      cool link 2
    </Menu.Item>
    <Menu.Item disabled>
      disabled
    </Menu.Item> 
    <Menu.SubMenu title="下拉选项">
      <Menu.Item>
        下拉选项一
      </Menu.Item>
      <Menu.Item>
        下拉选项二
      </Menu.Item>    
    </Menu.SubMenu>
  </Menu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = '默认Menu';

export const VerMenu = Template.bind({});
VerMenu.args = {
  mode: 'vertical',
};
VerMenu.storyName = '纵向的 Menu';

export const OpenedMenu = Template.bind({});
OpenedMenu.args = {
  mode: 'vertical',
  defaultOpenSubMenus: ['3']
}
OpenedMenu.storyName = '默认展开的纵向 Menu';