import { ComponentStory, ComponentMeta } from "@storybook/react";

import ListWrapper from "components/ListWrapper";

export default {
  title: "components/ListWrapper",
  component: ListWrapper,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListWrapper>;

const Template: ComponentStory<typeof ListWrapper> = (args) => (
  <ListWrapper {...args} />
);

export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Empty.args = {
  data: [],
  emptyMessage: "Пустой лист",
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  isLoading: true,
};

export const WithData = Template.bind({});
WithData.args = {
  data: [
    {
      id: "id",
      name: "name",
      description: "description",
      stargazerCount: 0,
      viewerHasStarred: true,
      owner: {
        login: "login",
      },
    },
  ],
};
