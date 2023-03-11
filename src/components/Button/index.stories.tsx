import React from "react";
import Button from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: 'Button组件',
  component: Button,
};

export default buttonMeta;

const Template: ComponentStory<typeof Button> = args => <Button {...args}></Button>;
export const Default = Template.bind({});
Default.args = {
  children: 'Defalut Button',
};
Default.storyName = '默认按钮样式';

export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button btnSize="lg">Large Button</Button>
    <Button btnSize="sm">Small Button</Button>
  </>
);
ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="primary">Primary Button</Button>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="link">Link Button</Button>
  </>
);
ButtonWithType.storyName = '不同类型的按钮';