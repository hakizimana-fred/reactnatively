import React, { useCallback, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme, useIsDark } from '@reactnatively/theme';
import { GlassView } from '@reactnatively/glass';
import type { TimePickerProps } from './TimePicker.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_HEIGHT   = 44;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT  = ITEM_HEIGHT * VISIBLE_ITEMS;

const AM_PM = ['AM', 'PM'];

const HOURS_24  = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const HOURS_12  = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES   = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date: Date, use24Hour: boolean): string {
  if (use24Hour) {
    const h   = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${min}`;
  }
  let h       = date.getHours();
  const ampm  = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const min   = date.getMinutes().toString().padStart(2, '0');
  return `${h.toString().padStart(2, '0')}:${min} ${ampm}`;
}

// Converts a 12-hour display index (0-based, i.e. 0=1,…,11=12) to 24-hour
function to24Hour(hourIndex: number, ampmIndex: number): number {
  const h12 = hourIndex + 1; // 1-12
  if (ampmIndex === 0) {
    // AM
    return h12 === 12 ? 0 : h12;
  } else {
    // PM
    return h12 === 12 ? 12 : h12 + 12;
  }
}

// ─── Wheel column ─────────────────────────────────────────────────────────────

interface WheelProps {
  items:         string[];
  selectedIndex: number;
  onSelect:      (index: number) => void;
  theme:         ReturnType<typeof useTheme>['theme'];
  width:         number;
}

const WheelColumn = React.memo<WheelProps>(({ items, selectedIndex, onSelect, theme, width }) => {
  const scrollRef  = useRef<ScrollView>(null);
  const lastIndex  = useRef(selectedIndex);

  const handleContentSize = useCallback(() => {
    scrollRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
  }, [selectedIndex]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y       = e.nativeEvent.contentOffset.y;
      const i       = Math.round(y / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(i, items.length - 1));
      if (clamped !== lastIndex.current) {
        lastIndex.current = clamped;
        onSelect(clamped);
      }
    },
    [items.length, onSelect],
  );

  return (
    <View style={[styles.wheel, { width }]}>
      <View
        pointerEvents="none"
        style={[styles.selectionHighlight, { borderColor: theme.colors.primary }]}
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={handleContentSize}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
      >
        {items.map((item, i) => {
          const isSelected = i === selectedIndex;
          return (
            <View key={i} style={styles.wheelItem}>
              <Text
                style={[
                  styles.wheelText,
                  {
                    color:      isSelected ? theme.colors.primary : theme.colors.textSecondary,
                    fontWeight: isSelected ? '600' : '400',
                    fontSize:   isSelected ? 18 : 15,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

WheelColumn.displayName = 'WheelColumn';

// ─── Main component ───────────────────────────────────────────────────────────

export const TimePicker = React.memo<TimePickerProps>(
  ({
    value:        valueProp,
    defaultValue,
    onChange,
    use24Hour    = false,
    glass        = false,
    isDisabled   = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const isControlled = valueProp !== undefined;
    const initDate     = valueProp ?? defaultValue ?? new Date();

    const [internal, setInternal] = useState<Date>(initDate);
    const currentDate  = isControlled ? valueProp! : internal;

    const [open, setOpen] = useState(false);

    // Compute initial draft indices
    function initDraftIndices(d: Date) {
      if (use24Hour) {
        return {
          hourIndex:   d.getHours(),
          minuteIndex: d.getMinutes(),
          ampmIndex:   0,
        };
      }
      const h24      = d.getHours();
      const ampmIdx  = h24 >= 12 ? 1 : 0;
      const h12      = h24 % 12 || 12;
      return {
        hourIndex:   h12 - 1,  // 0-based: 0=1h … 11=12h
        minuteIndex: d.getMinutes(),
        ampmIndex:   ampmIdx,
      };
    }

    const [draftHour,   setDraftHour]   = useState(() => initDraftIndices(initDate).hourIndex);
    const [draftMinute, setDraftMinute] = useState(() => initDraftIndices(initDate).minuteIndex);
    const [draftAmpm,   setDraftAmpm]   = useState(() => initDraftIndices(initDate).ampmIndex);

    const openPicker = useCallback(() => {
      if (isDisabled) return;
      const d = isControlled ? valueProp! : internal;
      const { hourIndex, minuteIndex, ampmIndex } = initDraftIndices(d);
      setDraftHour(hourIndex);
      setDraftMinute(minuteIndex);
      setDraftAmpm(ampmIndex);
      setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDisabled, isControlled, valueProp, internal, use24Hour]);

    const handleConfirm = useCallback(() => {
      const h = use24Hour ? draftHour : to24Hour(draftHour, draftAmpm);
      const next = new Date(currentDate);
      next.setHours(h, draftMinute, 0, 0);
      if (!isControlled) setInternal(next);
      onChange?.(next);
      setOpen(false);
    }, [use24Hour, draftHour, draftAmpm, draftMinute, currentDate, isControlled, onChange]);

    const handleCancel = useCallback(() => setOpen(false), []);

    const displayText = formatTime(currentDate, use24Hour);

    const hourItems = use24Hour ? HOURS_24 : HOURS_12;

    const panelContent = (
      <>
        <View style={styles.handle} />
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Select Time</Text>

        <View style={styles.wheelsRow}>
          <WheelColumn
            items={hourItems}
            selectedIndex={draftHour}
            onSelect={setDraftHour}
            theme={theme}
            width={80}
          />
          <Text style={[styles.timeSep, { color: theme.colors.textSecondary }]}>:</Text>
          <WheelColumn
            items={MINUTES}
            selectedIndex={draftMinute}
            onSelect={setDraftMinute}
            theme={theme}
            width={80}
          />
          {!use24Hour && (
            <WheelColumn
              items={AM_PM}
              selectedIndex={draftAmpm}
              onSelect={setDraftAmpm}
              theme={theme}
              width={64}
            />
          )}
        </View>

        <View style={styles.actions}>
          <Pressable onPress={handleCancel} style={styles.actionBtn}>
            <Text style={[styles.cancelText, { color: theme.colors.textSecondary }]}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleConfirm}
            style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </Pressable>
        </View>
      </>
    );

    return (
      <View style={[styles.wrapper, style]}>
        <Pressable
          onPress={openPicker}
          style={[
            styles.trigger,
            {
              borderColor:     theme.colors.border,
              opacity:         isDisabled ? 0.5 : 1,
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Time picker, current value: ${displayText}`}
          accessibilityState={{ disabled: isDisabled }}
        >
          <Text style={[styles.triggerText, { color: theme.colors.text }]}>
            {displayText}
          </Text>
          <Text style={[styles.triggerIcon, { color: theme.colors.textSecondary }]}>⏰</Text>
        </Pressable>

        <Modal
          visible={open}
          transparent
          animationType="slide"
          onRequestClose={handleCancel}
          statusBarTranslucent
        >
          <Pressable style={styles.backdrop} onPress={handleCancel}>
            <View style={styles.backdropFill} />
          </Pressable>

          {glass ? (
            <GlassView elevation={1} borderRadius={20} style={styles.panel}>
              {panelContent}
            </GlassView>
          ) : (
            <View
              style={[
                styles.panel,
                {
                  backgroundColor:      isDark ? theme.colors.surface : '#fff',
                  borderTopLeftRadius:  20,
                  borderTopRightRadius: 20,
                },
              ]}
            >
              {panelContent}
            </View>
          )}
        </Modal>
      </View>
    );
  },
);

TimePicker.displayName = 'TimePicker';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  } as ViewStyle,
  trigger: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: 16,
    paddingVertical:   14,
    borderWidth:       1.5,
    borderRadius:      12,
  } as ViewStyle,
  triggerText: {
    fontSize:   15,
    fontWeight: '400',
  } as TextStyle,
  triggerIcon: {
    fontSize: 18,
  } as TextStyle,
  backdrop: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  } as ViewStyle,
  backdropFill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  } as ViewStyle,
  panel: {
    position:      'absolute',
    bottom:        0,
    left:          0,
    right:         0,
    paddingBottom: 32,
    overflow:      'hidden',
  } as ViewStyle,
  handle: {
    alignSelf:       'center',
    width:           40,
    height:          4,
    borderRadius:    2,
    backgroundColor: 'rgba(120,120,128,0.3)',
    marginVertical:  12,
  } as ViewStyle,
  panelTitle: {
    fontSize:     17,
    fontWeight:   '600',
    textAlign:    'center',
    marginBottom: 8,
  } as TextStyle,
  wheelsRow: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    height:            WHEEL_HEIGHT,
    paddingHorizontal: 8,
    gap:               4,
  } as ViewStyle,
  wheel: {
    height:   WHEEL_HEIGHT,
    overflow: 'hidden',
  } as ViewStyle,
  selectionHighlight: {
    position:     'absolute',
    top:          ITEM_HEIGHT * 2,
    left:         4,
    right:        4,
    height:       ITEM_HEIGHT,
    borderWidth:  1,
    borderRadius: 8,
    zIndex:       1,
  } as ViewStyle,
  wheelItem: {
    height:         ITEM_HEIGHT,
    alignItems:     'center',
    justifyContent: 'center',
  } as ViewStyle,
  wheelText: {
    textAlign: 'center',
  } as TextStyle,
  timeSep: {
    fontSize:   24,
    fontWeight: '600',
    paddingBottom: 4,
  } as TextStyle,
  actions: {
    flexDirection:     'row',
    paddingHorizontal: 20,
    paddingTop:        16,
    gap:               12,
  } as ViewStyle,
  actionBtn: {
    flex:           1,
    height:         48,
    borderRadius:   12,
    alignItems:     'center',
    justifyContent: 'center',
  } as ViewStyle,
  cancelText: {
    fontSize:   16,
    fontWeight: '500',
  } as TextStyle,
  confirmText: {
    fontSize:   16,
    fontWeight: '600',
    color:      '#fff',
  } as TextStyle,
});
