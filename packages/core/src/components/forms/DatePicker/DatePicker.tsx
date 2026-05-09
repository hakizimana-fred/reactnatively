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
import type { DatePickerProps } from './DatePicker.types';

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 61 }, (_, i) => CURRENT_YEAR - 50 + i);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

function formatDateTime(date: Date): string {
  const base = formatDate(date);
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${base}  ${h}:${min}`;
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
  const scrollRef = useRef<ScrollView>(null);
  const lastIndex = useRef(selectedIndex);

  // Scroll to initial position without animation
  const handleContentSize = useCallback(() => {
    scrollRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
  }, [selectedIndex]);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      const i = Math.round(y / ITEM_HEIGHT);
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
      {/* Selection highlight */}
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
                    color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
                    fontWeight: isSelected ? '600' : '400',
                    fontSize:   isSelected ? 17 : 15,
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

export const DatePicker = React.memo<DatePickerProps>(
  ({
    value:        valueProp,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    mode         = 'date',
    glass        = false,
    isDisabled   = false,
    style,
  }) => {
    const { theme } = useTheme();
    const isDark    = useIsDark();

    const isControlled  = valueProp !== undefined;
    const initDate      = valueProp ?? defaultValue ?? new Date();

    const [internal, setInternal] = useState<Date>(initDate);
    const currentDate   = isControlled ? valueProp! : internal;

    const [open, setOpen] = useState(false);

    // Draft state while modal is open
    const [draftMonth, setDraftMonth] = useState(currentDate.getMonth());
    const [draftDay,   setDraftDay]   = useState(currentDate.getDate() - 1);
    const [draftYear,  setDraftYear]  = useState(
      YEARS.indexOf(currentDate.getFullYear()) >= 0
        ? YEARS.indexOf(currentDate.getFullYear())
        : 50,
    );
    const [draftHour,   setDraftHour]   = useState(currentDate.getHours());
    const [draftMinute, setDraftMinute] = useState(currentDate.getMinutes());

    const openPicker = useCallback(() => {
      if (isDisabled) return;
      const d = isControlled ? valueProp! : internal;
      setDraftMonth(d.getMonth());
      setDraftDay(d.getDate() - 1);
      const yi = YEARS.indexOf(d.getFullYear());
      setDraftYear(yi >= 0 ? yi : 50);
      setDraftHour(d.getHours());
      setDraftMinute(d.getMinutes());
      setOpen(true);
    }, [isDisabled, isControlled, valueProp, internal]);

    const handleConfirm = useCallback(() => {
      const month = draftMonth;
      const day   = draftDay + 1;
      const year  = YEARS[draftYear] ?? CURRENT_YEAR;
      const next  = new Date(year, month, day, draftHour, draftMinute, 0, 0);
      if (!isControlled) setInternal(next);
      onChange?.(next);
      setOpen(false);
    }, [draftMonth, draftDay, draftYear, draftHour, draftMinute, isControlled, onChange]);

    const handleCancel = useCallback(() => setOpen(false), []);

    const displayText = mode === 'datetime'
      ? formatDateTime(currentDate)
      : formatDate(currentDate);

    const hours   = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const panelContent = (
      <>
        <View style={styles.handle} />
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Select Date</Text>

        <View style={styles.wheelsRow}>
          <WheelColumn
            items={MONTHS}
            selectedIndex={draftMonth}
            onSelect={setDraftMonth}
            theme={theme}
            width={130}
          />
          <WheelColumn
            items={DAYS.map(d => d.toString().padStart(2, '0'))}
            selectedIndex={draftDay}
            onSelect={setDraftDay}
            theme={theme}
            width={60}
          />
          <WheelColumn
            items={YEARS.map(String)}
            selectedIndex={draftYear}
            onSelect={setDraftYear}
            theme={theme}
            width={80}
          />
        </View>

        {mode === 'datetime' && (
          <>
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.wheelsRow}>
              <WheelColumn
                items={hours}
                selectedIndex={draftHour}
                onSelect={setDraftHour}
                theme={theme}
                width={80}
              />
              <Text style={[styles.timeSep, { color: theme.colors.textSecondary }]}>:</Text>
              <WheelColumn
                items={minutes}
                selectedIndex={draftMinute}
                onSelect={setDraftMinute}
                theme={theme}
                width={80}
              />
            </View>
          </>
        )}

        <View style={styles.actions}>
          <Pressable onPress={handleCancel} style={styles.actionBtn}>
            <Text style={[styles.cancelText, { color: theme.colors.textSecondary }]}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleConfirm}
            style={[styles.actionBtn, styles.confirmBtn, { backgroundColor: theme.colors.primary }]}
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
              borderColor:  theme.colors.border,
              opacity:      isDisabled ? 0.5 : 1,
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Date picker, current value: ${displayText}`}
          accessibilityState={{ disabled: isDisabled }}
        >
          <Text style={[styles.triggerText, { color: theme.colors.text }]}>
            {displayText}
          </Text>
          <Text style={[styles.triggerIcon, { color: theme.colors.textSecondary }]}>📅</Text>
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

DatePicker.displayName = 'DatePicker';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  } as ViewStyle,
  trigger: {
    flexDirection:    'row',
    alignItems:       'center',
    justifyContent:   'space-between',
    paddingHorizontal: 16,
    paddingVertical:   14,
    borderWidth:      1.5,
    borderRadius:     12,
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
    position:  'absolute',
    bottom:    0,
    left:      0,
    right:     0,
    paddingBottom: 32,
    overflow:  'hidden',
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
    fontSize:   17,
    fontWeight: '600',
    textAlign:  'center',
    marginBottom: 8,
  } as TextStyle,
  wheelsRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    height:         WHEEL_HEIGHT,
    paddingHorizontal: 8,
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
  divider: {
    height:           1,
    marginHorizontal: 20,
    marginVertical:    8,
  } as ViewStyle,
  timeSep: {
    fontSize:   22,
    fontWeight: '600',
    marginHorizontal: 4,
  } as TextStyle,
  actions: {
    flexDirection:    'row',
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
  confirmBtn: {} as ViewStyle,
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
