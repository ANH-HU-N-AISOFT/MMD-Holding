import { expect } from '@storybook/jest';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { isEmpty } from 'ramda';
import { useState } from 'react';
import { AsyncComponent } from '../src/AsyncComponent';
import { Empty } from './components/Empty';
import { Loading } from './components/Loading';

export default {
  title: 'Shared/Components/AsyncComponent',
  component: AsyncComponent,
  argTypes: {},
  parameters: {
    docs: {},
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  args: {
    Loading: <Loading />,
    Empty: <Empty />,
    Failure: null,
  },
} as Meta<typeof AsyncComponent>;

export const Default: StoryFn<typeof AsyncComponent> = args => <AsyncComponent {...args} />;

export const StatusLoading: StoryFn<typeof AsyncComponent> = args => <AsyncComponent {...args} isLoading />;
export const StatusFailure: StoryFn<typeof AsyncComponent> = args => <AsyncComponent {...args} isFailure />;
export const StatusSuccess: StoryFn<typeof AsyncComponent> = args => (
  <AsyncComponent {...args} Success={<div>Something succeed</div>} />
);
export const StatusEmpty: StoryFn<typeof AsyncComponent> = args => <AsyncComponent {...args} isEmpty />;

const ScenarioRender = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);

  const mockSuccess = (): Promise<any> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([1, 2, 3, 4]);
      });
    });
  };
  const mockFailure = (): Promise<any> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject('Failure');
      });
    });
  };

  const handleMockRequest = async (variant: 'success' | 'failure'): Promise<void> => {
    const mock = variant === 'success' ? mockSuccess : mockFailure;
    setIsLoading(true);
    try {
      const data = await mock();
      setData(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-testid="container">
      <button onClick={() => handleMockRequest('success')}>Request success</button>
      <button onClick={() => handleMockRequest('failure')}>Request failure</button>
      <AsyncComponent
        Success={<h1>Success</h1>}
        Loading={<h1>Loading</h1>}
        Failure={<h1>Failure</h1>}
        Empty={<h1>Empty</h1>}
        isEmpty={isEmpty(data)}
        isFailure={isError}
        isLoading={isLoading}
      />
    </div>
  );
};
export const RenderCorrectlyWhenChangeStatusTesting: StoryObj = {
  render: ScenarioRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test for Initial State
    expect(canvas.queryByText('Loading')).toBeNull();
    expect(canvas.queryByText('Success')).toBeNull();
    expect(canvas.queryByText('Failure')).toBeNull();
    expect(canvas.queryByText('Empty')).toBeInTheDocument();

    // Test for Successful Request
    userEvent.click(canvas.getByText('Request success'));
    await waitFor(() => expect(canvas.getByText('Loading')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByText('Success')).toBeInTheDocument());

    // Test for Failed Request
    userEvent.click(canvas.getByText('Request failure'));
    await waitFor(() => expect(canvas.getByText('Loading')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByText('Failure')).toBeInTheDocument());
  },
};
