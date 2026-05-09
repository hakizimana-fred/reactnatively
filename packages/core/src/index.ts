// ─── Layout ───────────────────────────────────────────────────────────────────
export { Box } from './components/layout/Box';
export type { BoxProps } from './components/layout/Box';

export { Stack, HStack, VStack } from './components/layout/Stack';
export type { StackProps } from './components/layout/Stack';

export { Flex } from './components/layout/Flex';
export type { FlexProps } from './components/layout/Flex';

export { Grid } from './components/layout/Grid';
export type { GridProps } from './components/layout/Grid';

export { Center } from './components/layout/Center';
export type { CenterProps } from './components/layout/Center';

export { Spacer } from './components/layout/Spacer';
export type { SpacerProps } from './components/layout/Spacer';

export { Container } from './components/layout/Container';
export type { ContainerProps, ContainerMaxWidth } from './components/layout/Container';

export { Divider } from './components/layout/Divider';
export type { DividerProps } from './components/layout/Divider';

export { AspectRatio } from './components/layout/AspectRatio';
export type { AspectRatioProps } from './components/layout/AspectRatio';

export { Surface } from './components/layout/Surface';
export type { SurfaceProps, GlassSurfaceConfig } from './components/layout/Surface';

// ─── Typography ───────────────────────────────────────────────────────────────
export { Text } from './components/typography/Text';
export type { TextProps, TextVariant, TextWeight } from './components/typography/Text';

export { Heading } from './components/typography/Heading';
export type { HeadingProps, HeadingLevel } from './components/typography/Heading';

export { Caption } from './components/typography/Caption';
export type { CaptionProps } from './components/typography/Caption';

export { Paragraph } from './components/typography/Paragraph';
export type { ParagraphProps, ParagraphSize } from './components/typography/Paragraph';

export { Link } from './components/typography/Link';
export type { LinkProps } from './components/typography/Link';

export { Code } from './components/typography/Code';
export type { CodeProps } from './components/typography/Code';

export { GradientText } from './components/typography/GradientText';
export type { GradientTextProps } from './components/typography/GradientText';

// ─── Inputs ───────────────────────────────────────────────────────────────────
export { Button } from './components/inputs/Button';
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonColor,
  GlassButtonConfig,
} from './components/inputs/Button';

export { IconButton } from './components/inputs/IconButton';
export type { IconButtonProps, IconButtonSize, IconButtonVariant } from './components/inputs/IconButton';

export { FAB } from './components/inputs/FAB';
export type { FABProps, FABSize, FABVariant, FABPosition } from './components/inputs/FAB';

// ─── Forms ────────────────────────────────────────────────────────────────────
export { FormControl, useFormControl } from './components/forms/FormControl';
export type { FormControlProps, FormControlContextValue } from './components/forms/FormControl';

export { TextInput } from './components/forms/TextInput';
export type { TextInputProps } from './components/forms/TextInput';

export { PasswordInput } from './components/forms/PasswordInput';
export type { PasswordInputProps } from './components/forms/PasswordInput';

export { TextArea } from './components/forms/TextArea';
export type { TextAreaProps } from './components/forms/TextArea';

export { SearchBar } from './components/forms/SearchBar';
export type { SearchBarProps, SearchBarSize } from './components/forms/SearchBar';

export { Checkbox } from './components/forms/Checkbox';
export type { CheckboxProps, CheckboxSize } from './components/forms/Checkbox';

export { Radio, RadioGroup } from './components/forms/Radio';
export type { RadioProps, RadioGroupProps, RadioSize } from './components/forms/Radio';

export { Switch } from './components/forms/Switch';
export type { SwitchProps, SwitchSize, SwitchColor } from './components/forms/Switch';

export { Slider } from './components/forms/Slider';
export type { SliderProps } from './components/forms/Slider';

export { RangeSlider } from './components/forms/RangeSlider';
export type { RangeSliderProps } from './components/forms/RangeSlider';

export { OTPInput } from './components/forms/OTPInput';
export type { OTPInputProps } from './components/forms/OTPInput';

export { Select } from './components/forms/Select';
export type { SelectProps, SelectOption } from './components/forms/Select';

export { MultiSelect } from './components/forms/MultiSelect';
export type { MultiSelectProps } from './components/forms/MultiSelect';

export { DatePicker } from './components/forms/DatePicker';
export type { DatePickerProps } from './components/forms/DatePicker';

export { TimePicker } from './components/forms/TimePicker';
export type { TimePickerProps } from './components/forms/TimePicker';

// ─── Data Display ─────────────────────────────────────────────────────────────
export { LiquidCard } from './components/data-display/Card';
export type {
  LiquidCardProps,
  LiquidCardHeaderProps,
  LiquidCardBodyProps,
  LiquidCardFooterProps,
  LiquidCardImageProps,
} from './components/data-display/Card';

export { Avatar } from './components/data-display/Avatar';
export type { AvatarProps, AvatarSize } from './components/data-display/Avatar';

export { Badge } from './components/data-display/Badge';
export type { BadgeProps, BadgeVariant, BadgeStatus } from './components/data-display/Badge';

export { Chip } from './components/data-display/Chip';
export type { ChipProps, ChipVariant } from './components/data-display/Chip';

export { List, ListItem } from './components/data-display/List';
export type { ListProps, ListItemProps, ListSection } from './components/data-display/List';

export { Accordion } from './components/data-display/Accordion';
export type { AccordionProps, AccordionItemProps } from './components/data-display/Accordion';

export { Timeline } from './components/data-display/Timeline';
export type { TimelineProps, TimelineItem, TimelineItemStatus } from './components/data-display/Timeline';

export { Carousel } from './components/data-display/Carousel';
export type { CarouselProps } from './components/data-display/Carousel';

export { StatsCard } from './components/data-display/StatsCard';
export type { StatsCardProps, TrendDirection } from './components/data-display/StatsCard';

export { Table } from './components/data-display/Table';
export type { TableProps, TableColumn } from './components/data-display/Table';

// ─── Feedback ─────────────────────────────────────────────────────────────────
export { Alert } from './components/feedback/Alert';
export type { AlertProps, AlertStatus, AlertVariant } from './components/feedback/Alert';

export { Banner } from './components/feedback/Banner';
export type { BannerProps, BannerStatus } from './components/feedback/Banner';

export { Toast, ToastProvider, toast } from './components/feedback/Toast';
export type {
  ToastOptions,
  ToastItem,
  ToastType,
  ToastPosition,
  ToastAction,
} from './components/feedback/Toast';

export { Skeleton } from './components/feedback/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/feedback/Skeleton';

export { ProgressBar } from './components/feedback/ProgressBar';
export type { ProgressBarProps, ProgressBarVariant } from './components/feedback/ProgressBar';

export { Spinner } from './components/feedback/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/feedback/Spinner';

export { EmptyState } from './components/feedback/EmptyState';
export type { EmptyStateProps } from './components/feedback/EmptyState';

export { Dialog } from './components/feedback/Dialog';
export type { DialogProps } from './components/feedback/Dialog';

export { BottomSheet } from './components/feedback/BottomSheet';
export type { BottomSheetProps } from './components/feedback/BottomSheet';

export { Tooltip } from './components/feedback/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/feedback/Tooltip';

export { Popover } from './components/feedback/Popover';
export type { PopoverProps } from './components/feedback/Popover';

export { SnackbarProvider, snackbar } from './components/feedback/Snackbar';
export type { SnackbarOptions, SnackbarProviderProps } from './components/feedback/Snackbar';

// ─── Navigation ───────────────────────────────────────────────────────────────
export { Tabs } from './components/navigation/Tabs';
export type {
  TabsProps,
  TabProps,
  TabPanelProps,
  TabListProps,
  TabVariant,
} from './components/navigation/Tabs';

export { SegmentedTabs } from './components/navigation/SegmentedTabs';
export type {
  SegmentedTabsProps,
  SegmentedTabsOption,
  SegmentedTabsSize,
} from './components/navigation/SegmentedTabs';

export { TopNavigation } from './components/navigation/TopNavigation';
export type { TopNavigationProps } from './components/navigation/TopNavigation';

export { BottomNavigation } from './components/navigation/BottomNavigation';
export type { BottomNavigationProps, BottomNavigationItem } from './components/navigation/BottomNavigation';

export { Drawer } from './components/navigation/Drawer';
export type { DrawerProps, DrawerPlacement } from './components/navigation/Drawer';

export { Sidebar } from './components/navigation/Sidebar';
export type { SidebarProps } from './components/navigation/Sidebar';

export { Breadcrumb } from './components/navigation/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/navigation/Breadcrumb';

export { Stepper } from './components/navigation/Stepper';
export type { StepperProps, StepItem, StepStatus } from './components/navigation/Stepper';

// ─── Overlays ─────────────────────────────────────────────────────────────────
export { Modal } from './components/overlays/Modal';
export type { ModalProps, ModalSize } from './components/overlays/Modal';

export { ActionSheet } from './components/overlays/ActionSheet';
export type { ActionSheetProps, ActionSheetAction } from './components/overlays/ActionSheet';

export { CommandPalette } from './components/overlays/CommandPalette';
export type { CommandPaletteProps, CommandItem } from './components/overlays/CommandPalette';

export { ContextMenu } from './components/overlays/ContextMenu';
export type { ContextMenuProps, ContextMenuItem } from './components/overlays/ContextMenu';

export { HoverCard } from './components/overlays/HoverCard';
export type { HoverCardProps } from './components/overlays/HoverCard';

// ─── Motion ───────────────────────────────────────────────────────────────────
export { Fade } from './components/motion/Fade';
export type { FadeProps } from './components/motion/Fade';

export { Scale } from './components/motion/Scale';
export type { ScaleProps } from './components/motion/Scale';

export { Slide } from './components/motion/Slide';
export type { SlideProps, SlideDirection } from './components/motion/Slide';

export { BlurTransition } from './components/motion/BlurTransition';
export type { BlurTransitionProps } from './components/motion/BlurTransition';

export { MagneticPressable } from './components/motion/MagneticPressable';
export type { MagneticPressableProps } from './components/motion/MagneticPressable';

// ─── Advanced Glass ───────────────────────────────────────────────────────────
export { BlurSurface } from './components/glass-advanced/BlurSurface';
export type { BlurSurfaceProps } from './components/glass-advanced/BlurSurface';

export { DynamicIsland } from './components/glass-advanced/DynamicIsland';
export type { DynamicIslandProps, DynamicIslandState } from './components/glass-advanced/DynamicIsland';

export { FloatingDock } from './components/glass-advanced/FloatingDock';
export type { FloatingDockProps, DockItem } from './components/glass-advanced/FloatingDock';

export { MorphingContainer } from './components/glass-advanced/MorphingContainer';
export type { MorphingContainerProps, MorphingContainerShape } from './components/glass-advanced/MorphingContainer';

export { GlassNavbar } from './components/glass-advanced/GlassNavbar';
export type { GlassNavbarProps } from './components/glass-advanced/GlassNavbar';

export { GlassSidebar } from './components/glass-advanced/GlassSidebar';
export type { GlassSidebarProps, GlassSidebarItem } from './components/glass-advanced/GlassSidebar';

export { InteractiveGlassSurface } from './components/glass-advanced/InteractiveGlassSurface';
export type { InteractiveGlassSurfaceProps } from './components/glass-advanced/InteractiveGlassSurface';

export { FloatingMediaPanel } from './components/glass-advanced/FloatingMediaPanel';
export type { FloatingMediaPanelProps, MediaPanelState } from './components/glass-advanced/FloatingMediaPanel';

// ─── Re-exports from sub-packages ─────────────────────────────────────────────
export {
  ThemeProvider,
  useTheme,
  useColorScheme,
  useIsDark,
  useToken,
  createTheme,
  baseTheme,
  glassTokens,
  spacing,
  radii,
  typography,
  shadows,
  motion,
  springs,
} from '@reactnatively/theme';

export type {
  BaseTheme,
  ThemeColors,
  GlassElevation,
  GlassTintVariant,
  ColorSchemePreference,
  ResolvedColorScheme,
  InferTheme,
} from '@reactnatively/theme';

export {
  GlassView,
  FrostPanel,
  GLASS_CAPABILITY,
  SUPPORTS_BLUR,
  IS_FULL_GLASS,
  IS_PARTIAL_GLASS,
  IS_NO_GLASS,
  useGlassStyle,
} from '@reactnatively/glass';

export type {
  GlassViewProps,
  FrostPanelProps,
  GlassConfig,
  ResolvedGlassStyle,
} from '@reactnatively/glass';

export {
  usePressAnimation,
  useEntranceAnimation,
  useReducedMotion,
  useSpring,
  useDuration,
  SPRING_SNAPPY,
  SPRING_LIQUID,
  SPRING_REVEAL,
  SPRING_BOUNCE,
  SPRING_PRECISE,
  TIMING_FAST,
  TIMING_NORMAL,
  TIMING_SLOW,
  TIMING_ENTER,
  TIMING_EXIT,
} from '@reactnatively/animations';
