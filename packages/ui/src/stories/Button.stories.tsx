import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    size: 'medium',
    theme: 'fill',
    disabled: false,
    children: 'Button',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    theme: {
      control: 'radio',
      options: ['text', 'gray', 'tint', 'fill'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'medium',
    theme: 'fill',
  },
};
