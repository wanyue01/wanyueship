import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AutoComplete, { DataSourceType } from '.';

export default {
  title: 'AutoComplete 组件',
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

interface Altman {
  value: string;
  id: number;
};

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
};

const altman = ['初代', '赛文', '杰克', '艾斯', '泰罗', '雷欧', '爱迪', '葛雷', '帕瓦特', '迪迦', '戴拿', '盖亚', '高斯', '奈克瑟斯'];

export const SimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const handleFetch = (query: string) => altman.filter(item => item.includes(query)).map(item => ({ value: item }));
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder='输入奥特曼的中文名试试~ 推荐输入“斯”'
    />
  );
};
SimpleComplete.storyName = '基本的搜索';

export const CustomComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const altmanWithId = altman.map((item, index) => ({ value: item, id: index }));
  const handleFetch = (query: string) => {
    return altmanWithId.filter(item => item.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const data = item as DataSourceType<Altman>;
    return (
      <>
        <b>名号：{data.value}</b>
        <span>id：{data.id}</span>
      </>
    )
  };
  return (
    <AutoComplete
      {...args}
      placeholder={'输入奥特曼的中文名试试~有自定义下拉列表~推荐输入“斯”'}
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
    />
  );
};
CustomComplete.storyName = '自定义搜索结果模板';

export const PromiseComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(data => data.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <h2>Name: {itemWithGithub.value}</h2>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  };
  return (
    <>
      <AutoComplete
        {...args}
        fetchSuggestions={handleFetch}
        renderOption={renderOption}
        placeholder='输入Github用户名试试~'
      />
    </>
  )
};
PromiseComplete.storyName = '支持异步搜索';