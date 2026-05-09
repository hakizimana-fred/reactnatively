import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import { SPRING_BOUNCE, TIMING_FAST } from '@reactnatively/animations';
import type { StepItem, StepperProps, StepStatus, StepperVariant } from './Stepper.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const CIRCLE_SIZE = 32;
const DOT_SIZE = 12;
const CONNECTOR_THICKNESS = 2;

// ─── Derived status helper ────────────────────────────────────────────────────

function resolveStatus(step: StepItem, index: number, activeStep: number): StepStatus {
  if (step.status) return step.status;
  if (index < activeStep) return 'complete';
  if (index === activeStep) return 'current';
  return 'upcoming';
}

// ─── StepIndicator ───────────────────────────────────────────────────────────

interface StepIndicatorProps {
  status: StepStatus;
  stepNumber: number;
  variant: StepperVariant;
}

const StepIndicator = React.memo<StepIndicatorProps>(({ status, stepNumber, variant }) => {
  const { theme } = useTheme();

  // Pulse animation for current step
  const pulse = useSharedValue(status === 'current' ? 1 : 0);

  useEffect(() => {
    if (status === 'current') {
      // Pulse ring
      pulse.value = withSpring(1, SPRING_BOUNCE);
    } else {
      pulse.value = withTiming(0, TIMING_FAST);
    }
  }, [status]);

  const pulseStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    return {
      transform: [{ scale: interpolate(pulse.value, [0, 1], [0.6, 1]) }],
      opacity: pulse.value,
    };
  });

  const primaryColor = theme.colors.primary;
  const grayColor = theme.colors.border;
  const isDone = status === 'complete';
  const isCurrent = status === 'current';

  if (variant === 'dots') {
    const dotColor = isDone || isCurrent ? primaryColor : grayColor;
    return (
      <View style={styles.dotWrapper}>
        {isCurrent && (
          <Animated.View
            style={[
              styles.dotRing,
              { borderColor: primaryColor },
              pulseStyle,
            ]}
          />
        )}
        <View
          style={[
            styles.dot,
            { backgroundColor: dotColor },
          ]}
        />
      </View>
    );
  }

  // circles / numbers
  const bgColor = isDone ? primaryColor : isCurrent ? 'transparent' : 'transparent';
  const borderColor = isDone || isCurrent ? primaryColor : grayColor;

  return (
    <View style={styles.circleWrapper}>
      {isCurrent && (
        <Animated.View
          style={[
            styles.circleRing,
            { borderColor: primaryColor },
            pulseStyle,
          ]}
        />
      )}
      <View
        style={[
          styles.circle,
          {
            backgroundColor: bgColor,
            borderColor,
            borderWidth: isDone ? 0 : 2,
          },
        ]}
      >
        {isDone ? (
          <Text style={styles.checkmark} allowFontScaling={false}>
            ✓
          </Text>
        ) : variant === 'numbers' ? (
          <Text
            style={[
              styles.stepNumber,
              { color: isCurrent ? primaryColor : grayColor },
            ]}
            allowFontScaling={false}
          >
            {stepNumber}
          </Text>
        ) : null}
      </View>
    </View>
  );
});

StepIndicator.displayName = 'Stepper.Indicator';

// ─── Connector ───────────────────────────────────────────────────────────────

interface ConnectorProps {
  isComplete: boolean;
  orientation: 'horizontal' | 'vertical';
}

const Connector = React.memo<ConnectorProps>(({ isComplete, orientation }) => {
  const { theme } = useTheme();
  const fillProgress = useSharedValue(isComplete ? 1 : 0);

  useEffect(() => {
    fillProgress.value = withTiming(isComplete ? 1 : 0, TIMING_FAST);
  }, [isComplete]);

  const fillStyle = useAnimatedStyle((): ViewStyle => {
    'worklet';
    if (orientation === 'horizontal') {
      return { width: `${fillProgress.value * 100}%` as any };
    }
    return { height: `${fillProgress.value * 100}%` as any };
  });

  const isHoriz = orientation === 'horizontal';

  return (
    <View
      style={[
        styles.connectorTrack,
        isHoriz ? styles.connectorHoriz : styles.connectorVert,
        { backgroundColor: theme.colors.border },
      ]}
    >
      <Animated.View
        style={[
          isHoriz ? styles.connectorFillHoriz : styles.connectorFillVert,
          { backgroundColor: theme.colors.primary },
          fillStyle,
        ]}
      />
    </View>
  );
});

Connector.displayName = 'Stepper.Connector';

// ─── Single Step ─────────────────────────────────────────────────────────────

interface StepProps {
  step: StepItem;
  index: number;
  total: number;
  activeStep: number;
  variant: StepperVariant;
  orientation: 'horizontal' | 'vertical';
}

const Step = React.memo<StepProps>(({ step, index, total, activeStep, variant, orientation }) => {
  const { theme } = useTheme();
  const status = resolveStatus(step, index, activeStep);
  const isLast = index === total - 1;
  const isHoriz = orientation === 'horizontal';

  const labelColor = status === 'upcoming' ? theme.colors.textMuted : theme.colors.text;
  const descColor = theme.colors.textSecondary;

  if (isHoriz) {
    return (
      <View style={styles.stepHoriz}>
        {/* Indicator + connector row */}
        <View style={styles.stepHorizTrack}>
          <StepIndicator status={status} stepNumber={index + 1} variant={variant} />
          {!isLast && (
            <View style={styles.connectorHorizWrapper}>
              <Connector isComplete={status === 'complete'} orientation="horizontal" />
            </View>
          )}
        </View>
        {/* Label below indicator */}
        <View style={styles.stepLabelHoriz}>
          <Text
            style={[styles.stepLabel, { color: labelColor }]}
            numberOfLines={2}
            allowFontScaling={false}
          >
            {step.label}
          </Text>
          {step.description != null && (
            <Text
              style={[styles.stepDesc, { color: descColor }]}
              numberOfLines={2}
              allowFontScaling={false}
            >
              {step.description}
            </Text>
          )}
        </View>
      </View>
    );
  }

  // Vertical layout
  return (
    <View style={styles.stepVert}>
      <View style={styles.stepVertLeft}>
        <StepIndicator status={status} stepNumber={index + 1} variant={variant} />
        {!isLast && (
          <View style={styles.connectorVertWrapper}>
            <Connector isComplete={status === 'complete'} orientation="vertical" />
          </View>
        )}
      </View>
      <View style={styles.stepVertContent}>
        <Text
          style={[styles.stepLabel, { color: labelColor }]}
          allowFontScaling={false}
        >
          {step.label}
        </Text>
        {step.description != null && (
          <Text
            style={[styles.stepDesc, { color: descColor }]}
            allowFontScaling={false}
          >
            {step.description}
          </Text>
        )}
      </View>
    </View>
  );
});

Step.displayName = 'Stepper.Step';

// ─── Stepper ─────────────────────────────────────────────────────────────────

export const Stepper = React.memo<StepperProps>(
  ({
    steps,
    activeStep = 0,
    orientation = 'horizontal',
    variant = 'circles',
    glass = false,
    style,
  }) => {
    const content = (
      <View
        style={[
          orientation === 'horizontal' ? styles.rootHoriz : styles.rootVert,
        ]}
      >
        {steps.map((step, index) => (
          <Step
            key={`step-${index}`}
            step={step}
            index={index}
            total={steps.length}
            activeStep={activeStep}
            variant={variant}
            orientation={orientation}
          />
        ))}
      </View>
    );

    if (glass) {
      return (
        <GlassView elevation={1} borderRadius={16} style={style}>
          <View style={styles.glassPadding}>{content}</View>
        </GlassView>
      );
    }

    return <View style={style}>{content}</View>;
  },
);

Stepper.displayName = 'Stepper';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  rootHoriz: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rootVert: {
    flexDirection: 'column',
  },
  glassPadding: {
    padding: 16,
  },

  // Horizontal step
  stepHoriz: {
    flex: 1,
    alignItems: 'center',
  },
  stepHorizTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  connectorHorizWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  stepLabelHoriz: {
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },

  // Vertical step
  stepVert: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  stepVertLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepVertContent: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 16,
  },
  connectorVertWrapper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 4,
  },

  // Circle indicator
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleRing: {
    position: 'absolute',
    width: CIRCLE_SIZE + 8,
    height: CIRCLE_SIZE + 8,
    borderRadius: (CIRCLE_SIZE + 8) / 2,
    borderWidth: 2,
    opacity: 0.4,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 18,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Dot indicator
  dotWrapper: {
    width: DOT_SIZE + 8,
    height: DOT_SIZE + 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  dotRing: {
    position: 'absolute',
    width: DOT_SIZE + 8,
    height: DOT_SIZE + 8,
    borderRadius: (DOT_SIZE + 8) / 2,
    borderWidth: 2,
    opacity: 0.4,
  },

  // Connector
  connectorTrack: {
    borderRadius: CONNECTOR_THICKNESS / 2,
    overflow: 'hidden',
  },
  connectorHoriz: {
    height: CONNECTOR_THICKNESS,
    width: '100%',
  },
  connectorVert: {
    width: CONNECTOR_THICKNESS,
    flex: 1,
    minHeight: 24,
  },
  connectorFillHoriz: {
    height: '100%',
  },
  connectorFillVert: {
    width: '100%',
  },

  // Labels
  stepLabel: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'left',
  },
  stepDesc: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 2,
  },
});
