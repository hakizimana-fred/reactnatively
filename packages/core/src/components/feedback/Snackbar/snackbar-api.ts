export interface SnackbarOptions {
  message: string;
  duration?: number;
  action?: { label: string; onPress: () => void };
  position?: 'bottom' | 'top';
  glass?: boolean;
}

type ShowCallback = (opts: SnackbarOptions) => void;
type HideCallback = () => void;

let showCb: ShowCallback | null = null;
let hideCb: HideCallback | null = null;

export const snackbar = {
  show(opts: SnackbarOptions): void {
    showCb?.(opts);
  },
  hide(): void {
    hideCb?.();
  },

  // Internal — used by SnackbarProvider
  _register(onShow: ShowCallback, onHide: HideCallback): () => void {
    showCb = onShow;
    hideCb = onHide;
    return () => {
      showCb = null;
      hideCb = null;
    };
  },
};
