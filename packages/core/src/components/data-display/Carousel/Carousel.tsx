import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  type ViewToken,
} from 'react-native';
import { GlassView } from '@reactnatively/glass';
import { useTheme } from '@reactnatively/theme';
import type { CarouselProps } from './Carousel.types';

const SCREEN_WIDTH = Dimensions.get('window').width;

// ─── Dot indicator ────────────────────────────────────────────────────────────

interface DotsProps {
  count:       number;
  activeIndex: number;
  primaryColor: string;
}

const Dots = React.memo<DotsProps>(({ count, activeIndex, primaryColor }) => {
  if (count <= 1) return null;

  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: isActive
                  ? primaryColor
                  : 'rgba(150,150,150,0.35)',
                width:  isActive ? 20 : 8,
                height: 8,
              },
            ]}
          />
        );
      })}
    </View>
  );
});
Dots.displayName = 'Carousel.Dots';

// ─── Carousel ─────────────────────────────────────────────────────────────────

export const Carousel = React.memo<CarouselProps>(
  ({
    data,
    renderItem,
    itemWidth         = SCREEN_WIDTH,
    gap               = 0,
    showDots          = true,
    autoPlay          = false,
    autoPlayInterval  = 3000,
    loop              = false,
    onIndexChange,
    glass             = false,
    style,
  }) => {
    const { theme }   = useTheme();
    const listRef     = useRef<FlatList>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);

    const stepSize = itemWidth + gap;

    // Viewability config — item must be ≥50% visible to count as "active"
    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
    });

    const onViewableItemsChanged = useRef(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0]?.index != null) {
          const idx = viewableItems[0].index;
          setActiveIdx(idx);
          onIndexChange?.(idx);
        }
      },
    );

    // AutoPlay
    const advance = useCallback(() => {
      setActiveIdx((prev) => {
        const next = loop
          ? (prev + 1) % data.length
          : Math.min(prev + 1, data.length - 1);
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, [data.length, loop]);

    useEffect(() => {
      if (!autoPlay || data.length <= 1) return;
      timerRef.current = setInterval(advance, autoPlayInterval);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [autoPlay, autoPlayInterval, advance, data.length]);

    const keyExtractor = useCallback(
      (_: any, index: number) => String(index),
      [],
    );

    const renderListItem = useCallback(
      ({ item, index }: { item: any; index: number }) => (
        <View
          style={{
            width:       itemWidth,
            marginRight: index < data.length - 1 ? gap : 0,
          }}
        >
          {renderItem({ item, index })}
        </View>
      ),
      [renderItem, itemWidth, gap, data.length],
    );

    const list = (
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderListItem}
        snapToInterval={stepSize}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        pagingEnabled={gap === 0 && itemWidth === SCREEN_WIDTH}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={(_, index) => ({
          length: stepSize,
          offset: stepSize * index,
          index,
        })}
      />
    );

    const container = glass ? (
      <GlassView
        borderRadius={16}
        style={style}
        contentStyle={styles.glassContent}
      >
        {list}
        {showDots && (
          <Dots
            count={data.length}
            activeIndex={activeIdx}
            primaryColor={theme.colors.primary}
          />
        )}
      </GlassView>
    ) : (
      <View style={style}>
        {list}
        {showDots && (
          <Dots
            count={data.length}
            activeIndex={activeIdx}
            primaryColor={theme.colors.primary}
          />
        )}
      </View>
    );

    return container;
  },
);
Carousel.displayName = 'Carousel';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  glassContent: {
    overflow: 'hidden',
  },
  dotsRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    gap:            6,
    paddingVertical: 10,
  },
  dot: {
    borderRadius:   4,
  },
});
