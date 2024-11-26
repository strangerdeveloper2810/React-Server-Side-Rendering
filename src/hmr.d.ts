// hmr.d.ts
declare global {
  interface NodeModule {
    hot?: {
      accept: (path?: string | string[], callback?: () => void) => void;
    };
  }
}

export {};
