import { Meta, StoryFn } from '@storybook/react';
import { Loading } from '../src/Loading';

export default {
  title: 'Shared/Components/Loading',
  component: Loading,
  argTypes: {},
  parameters: {
    docs: {},
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  args: {},
} as Meta<typeof Loading>;

export const Default: StoryFn<typeof Loading> = args => <Loading {...args} />;
