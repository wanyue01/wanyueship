import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '.';

export default {
  title: 'Input 组件',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{width: '350px'}}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...args} />
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Default Input'
};
Default.storyName = '默认的 Input';

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  placeholder: 'Disabled Input',
  disabled: true,
};
DisabledInput.storyName = '禁用的 Input';

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  placeholder: 'Input with icon',
  icon: 'search',
};
InputWithIcon.storyName = '带有图标的 Input';

export const SizeInput: ComponentStory<typeof Input> = () => (
  <>
    <Input size='lg' placeholder='Large' />
    <hr />
    <Input size='sm' placeholder='Small' />
  </>
);
SizeInput.storyName = '不同大小的 Input';

export const ExtendInput: ComponentStory<typeof Input> = () => (
  <>
    <Input pre='https://' placeholder='Has Prefix' />
    <hr />
    <Input suf='.com' placeholder='Has Suffix' />
  </>
);
ExtendInput.storyName = '有前缀或后缀的 Input';