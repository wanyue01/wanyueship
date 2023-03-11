import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Select from '.';

export default {
  title: 'Select 组件',
  component: Select,
  // id: 'Select',
  subcomponents: { 'Option': Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Select>

export const DefaultSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="请选择"
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="disabled" disabled />
    <Select.Option value="nihao5" />
    <Select.Option value="nihao6" />
  </Select>
);
DefaultSelect.storyName = '默认的Select';

export const MultipleSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="支持多选ao！"
    multiple
    onChange={(a,b) => {console.log(a,b)}}
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
    <Select.Option value="viking" />
    <Select.Option value="viking2" />
  </Select>
);
MultipleSelect.storyName = '支持多选的 Select';

export const DisabledSelect: ComponentStory<typeof Select> = (args) => (
  <Select
    {...args}
    placeholder="禁用啦！"
    disabled
  >
    <Select.Option value="nihao" />
    <Select.Option value="nihao2" />
    <Select.Option value="nihao3" />
  </Select>
);
DisabledSelect.storyName = '被禁用的 Select';