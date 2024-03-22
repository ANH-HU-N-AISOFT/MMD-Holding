import { Meta, StoryFn } from '@storybook/react';
import { Empty } from '../src/Empty';

export default {
  title: 'Shared/Components/Empty',
  component: Empty,
  argTypes: {},
  parameters: {
    docs: {},
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  args: {},
} as Meta<typeof Empty>;

export const Default: StoryFn<typeof Empty> = args => <Empty {...args} />;
