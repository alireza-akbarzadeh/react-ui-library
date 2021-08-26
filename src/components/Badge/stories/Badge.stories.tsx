import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../Badge';
import BadgeDocumentation from './Badge.docs.mdx';

export default {
  title: 'Display/Badge',
  component: Badge,
  argTypes: {
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    pulsing: {
      table: {
        category: 'Primary controls',
      },
    },
    position: {
      options: [undefined, 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'select' },
      table: {
        category: 'Primary controls',
      },
    },
    shape: {
      options: ['point', 'marker', 'count', 'label'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },

    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    outlined: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: BadgeDocumentation,
      description: {
        component: 'A badge can display a count, a label or a simple marker.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

const defaultArgs = {
  color: 'primary' as BadgeProps['color'],
  pulsing: false,
  shape: 'marker' as BadgeProps['shape'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const PointShape = Template.bind({});
PointShape.storyName = 'Shape: Point';
PointShape.args = {
  ...defaultArgs,
  shape: 'point',
};

export const MarkerShape = Template.bind({});
MarkerShape.storyName = 'Shape: Marker';
MarkerShape.args = {
  ...defaultArgs,
  shape: 'marker',
};

export const CountShape = Template.bind({});
CountShape.storyName = 'Shape: Count';
CountShape.args = {
  ...defaultArgs,
  children: 99,
  shape: 'count',
};

export const LabelShape = Template.bind({});
LabelShape.storyName = 'Shape: Label';
LabelShape.args = {
  ...defaultArgs,
  children: 'Beta',
  shape: 'label',
};

export const Pulsing = Template.bind({});
Pulsing.args = {
  ...defaultArgs,
  pulsing: true,
};