import React, { useState } from 'react';
import { ThemeProps } from '../../types';
import { TabsVariant } from './types';
import { useComponentId } from '../../hooks/useComponentId';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { TabList, TabListProps } from './TabList';
import { TabPanelGroup, TabPanelGroupProps } from './TabPanelGroup';
import { TabsContainer } from './TabsContainer';

export type TabsRenderChildren = (
  props: Pick<
    TabsProps,
    'className' | 'contrast' | 'items' | 'style' | 'themeId' | 'variant' | 'vertical' | 'unstyled'
  > & {
    componentId: string;
    ref: React.Ref<HTMLElement>;
  },
) => React.ReactElement<HTMLDivElement>;

export interface TabsProps extends ThemeProps {
  allowUnselect?: boolean;
  children?: TabsRenderChildren;
  className?: string;
  contrast?: boolean;
  fullWidth?: boolean;
  initialSelected?: string;
  items: Array<TabListProps['items'][0] & TabPanelGroupProps['items'][0]>;
  listProps?: React.HTMLAttributes<HTMLDivElement>;
  onSelect?: InteractiveGroupProviderProps['onSelect'];
  panelGroupProps?: React.HTMLAttributes<HTMLDivElement>;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: TabsVariant;
  vertical?: boolean;
}

export function Tabs({
  allowUnselect,
  children,
  className,
  contrast,
  fullWidth,
  initialSelected,
  items,
  listProps = {},
  onSelect,
  panelGroupProps = {},
  style,
  themeId,
  unstyled,
  variant: initVariant = 'primary',
  vertical,
  ...props
}: TabsProps): React.ReactElement {
  const { componentId } = useComponentId();
  const [focused, setFocused] = useState(false);
  const variant = unstyled ? undefined : initVariant;

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = () => setFocused(false);
  const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => setFocused(true);

  return (
    <ListRegistryProvider>
      <InteractiveGroupProvider<HTMLDivElement, HTMLDivElement>
        disableUnselect={!allowUnselect}
        onSelect={onSelect}
        items={items}
        initialSelected={initialSelected || (items[0] && items[0].id)}
        {...props}
      >
        {
          ref =>
            /* eslint-disable react/jsx-indent */
            typeof children === 'function' ? (
              children({
                className,
                componentId,
                contrast,
                items,
                ref,
                style,
                themeId,
                variant,
                vertical,
                unstyled,
                ...props,
              })
            ) : (
              <TabsContainer
                className={className}
                contrast={contrast}
                focused={focused}
                style={style}
                unstyled={unstyled}
                variant={variant}
                vertical={vertical}
              >
                <TabList
                  componentId={componentId}
                  contrast={contrast}
                  fullWidth={fullWidth}
                  ref={ref}
                  items={items}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  themeId={themeId}
                  unstyled={unstyled}
                  variant={variant}
                  vertical={vertical}
                  {...listProps}
                />
                <TabPanelGroup
                  componentId={componentId}
                  contrast={contrast}
                  focused={focused}
                  items={items}
                  themeId={themeId}
                  unstyled={unstyled}
                  variant={variant}
                  vertical={vertical}
                  {...panelGroupProps}
                />
              </TabsContainer>
            )
          /* eslint-enable react/jsx-indent */
        }
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}
