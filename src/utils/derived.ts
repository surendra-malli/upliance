// src/utils/derived.ts
export const evaluateDerived = (expression: string, context: Record<string, any>) => {
  try {
    const names = Object.keys(context);
    const values = names.map(k => context[k]);
    // eslint-disable-next-line no-new-func
    const fn = new Function(...names, `return (${expression});`);
    return fn(...values);
  } catch (e) {
    console.error('derived eval error', e);
    return undefined;
  }
};
