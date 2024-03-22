import { expect } from '@storybook/jest';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { useState } from 'react';
import { delay } from 'utilities';
import { FixedProgressLoader } from '../src/FixedProgressLoader';

export default {
  title: 'Shared/Components/FixedProgressLoader',
  component: FixedProgressLoader,
  argTypes: {},
  parameters: {
    docs: {},
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  args: {
    duration: 300,
  },
} as Meta<typeof FixedProgressLoader>;

export const Default: StoryFn<typeof FixedProgressLoader> = args => <FixedProgressLoader {...args} />;

const RenderCorrectlyScenario = (): JSX.Element => {
  const [done, setDone] = useState(false);
  return (
    <div data-testid="container">
      <FixedProgressLoader done={done} duration={1000} />
      <button id="doneBtn" onClick={() => setDone(true)}>
        Done it
      </button>
    </div>
  );
};
export const RenderCorrectlyTesting: StoryObj = {
  render: RenderCorrectlyScenario,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const $containerEl = canvas.getByTestId('container');
    expect($containerEl.querySelector('.FixedProgressLoader__container')).toBeTruthy();
    await delay(3000);
    const $doneBtn = $containerEl.querySelector('#doneBtn') as HTMLElement;
    await userEvent.click($doneBtn);
    await waitFor(() => expect($containerEl.querySelector('.FixedProgressLoader__container')).toBeFalsy());
  },
};
