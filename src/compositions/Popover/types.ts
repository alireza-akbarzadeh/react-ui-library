import { UseAbsoluteCoordsInterface } from '../../hooks/useAbsoluteCoords';
import { RenderFromPropElement } from '../../utils/renderFromProp';
import { PositionOffset } from './../../utils/getPositionOffset';

export type PopoverRenderChildrenProps = Pick<
  PopoverContentProps,
  'close' | 'focusRef' | 'focusable' | 'isTogglerFocused' | 'position' | 'visible'
> & {
  offset: PositionOffset;
};

export interface PopoverContentProps
  extends Pick<UseAbsoluteCoordsInterface, 'centered' | 'offset' | 'position'>,
    React.HTMLAttributes<HTMLDivElement> {
  alwaysRender?: boolean;
  className?: string;
  close: (timeout?: number) => void;
  focusable?: boolean;
  focusRef?: React.MutableRefObject<HTMLElement>;
  height?: number;
  isTogglerFocused?: boolean;
  observe?: boolean;
  /** parentRef is really only needed for portal popovers */
  parentRef: React.MutableRefObject<HTMLDivElement>;
  visible?: boolean;
  width?: number | string;
}

/** If withChildrenProps is true then it we need a renderChildren function */
export interface PopoverContentPropsRenderChildren {
  children?: never;
  renderChildren: RenderFromPropElement<PopoverRenderChildrenProps>;
  withChildrenProps: true;
}

/** if withChildrenProps is not true then children should be a regular react node */
export interface PopoverContentPropsChildren {
  children: React.ReactNode;
  renderChildren?: never;
  withChildrenProps?: false;
}