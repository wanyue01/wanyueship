import React  from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Upload from '.'
import Button from '../Button'
import Icon from '../Icon'

export default { 
  title: 'Upload 组件',
  // id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
} as ComponentMeta<typeof Upload>;

export const SimpleUpload: ComponentStory<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <Button btnSize="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
  </Upload>  
);
SimpleUpload.storyName = '普通的 Upload 组件';

export const CheckUpload: ComponentStory<typeof Upload> = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big');
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={checkFileSize}
    >
      <Button btnSize="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>  
  );
};
CheckUpload.storyName = '上传前检查文件大小';

export const DragUpload: ComponentStory<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
);
DragUpload.storyName = '拖动上传';