import { create } from 'zustand';

interface EditorState {
  imageSrc: string | null;
  videoSrc: string | null;
  fileType: 'image' | 'video' | null;
  
  // History
  history: Partial<EditorState>[];
  historyIndex: number;

  // Active Tool
  activeTab: string;
  isDrawingMode: boolean;
  brushColor: string;
  brushWidth: number;

  // Transformers & Filters (Global overrides if needed)
  brightness: number;
  contrast: number;
  saturate: number;
  sepia: number;
  hue: number;
  blur: number;
  temperature: number;
  vignette: number;
  exposure: number;
  cropRatio: string;

  // Methods
  setImage: (src: string) => void;
  setVideo: (src: string) => void;
  setActiveTab: (tab: string) => void;
  setDrawingMode: (active: boolean) => void;
  setBrushSettings: (color: string, width: number) => void;
  setFilter: (key: string, value: number) => void;
  setCropRatio: (ratio: string) => void;
  reset: () => void;
  saveToHistory: (snapshot?: Partial<EditorState>) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  imageSrc: null,
  videoSrc: null,
  fileType: null,
  
  history: [],
  historyIndex: -1,

  activeTab: 'transform',
  isDrawingMode: false,
  brushColor: '#3b82f6',
  brushWidth: 5,

  brightness: 100,
  contrast: 100,
  saturate: 100,
  sepia: 0,
  hue: 0,
  blur: 0,
  temperature: 0,
  vignette: 0,
  exposure: 100,
  cropRatio: 'Free',

  setImage: (src) => set({ imageSrc: src, videoSrc: null, fileType: 'image' }),
  setVideo: (src) => set({ videoSrc: src, imageSrc: null, fileType: 'video' }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setDrawingMode: (active) => set({ isDrawingMode: active }),
  setBrushSettings: (color, width) => set({ brushColor: color, brushWidth: width }),
  
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  setCropRatio: (ratio) => set({ cropRatio: ratio }),

  reset: () => set({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    hue: 0,
    blur: 0,
    temperature: 0,
    vignette: 0,
    exposure: 100,
    activeTab: 'transform',
    isDrawingMode: false,
  }),

  saveToHistory: (snapshot) => {
    const { history, historyIndex, ...state } = get();
    const currentSnapshot: Partial<EditorState> = snapshot || {
      brightness: state.brightness,
      contrast: state.contrast,
      saturate: state.saturate,
      sepia: state.sepia,
      hue: state.hue,
      blur: state.blur,
      temperature: state.temperature,
      vignette: state.vignette,
      exposure: state.exposure,
    };
    
    const newHistory = [...history.slice(0, historyIndex + 1), currentSnapshot];
    if (newHistory.length > 30) newHistory.shift();
    
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({ ...prevState, historyIndex: historyIndex - 1 });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({ ...nextState, historyIndex: historyIndex + 1 });
    }
  }
}));
