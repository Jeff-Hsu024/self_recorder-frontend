import { useCallback } from 'react';

export const getDaisyUIColor = (cssVar: string, opacity: number = 1) => {
  if (typeof document === 'undefined') return `rgba(0,0,0,${opacity})`;
  const colorMap: { [key: string]: string } = {
    '--p': `rgba(59, 130, 246, ${opacity})`, // blue-500
    '--s': `rgba(16, 185, 129, ${opacity})`, // emerald-500
    '--a': `rgba(239, 68, 68, ${opacity})`,  // red-500
    '--n': `rgba(107, 114, 128, ${opacity})`, // gray-500
    '--nf': `rgba(243, 244, 246, ${opacity})`, // gray-100
    '--su': `rgba(34, 197, 94, ${opacity})`, // green-500
    '--wa': `rgba(251, 191, 36, ${opacity})`, // yellow-500
    '--er': `rgba(239, 68, 68, ${opacity})`, // red-500
    '--in': `rgba(96, 165, 250, ${opacity})`, // blue-400
  };
  return colorMap[cssVar] || `rgba(0,0,0,${opacity})`;
};

export const getChartColors = (count: number, opacity: number, startIndex: number = 0) => {
  const daisyUIColors = ['--p', '--s', '--a', '--n', '--su', '--wa', '--er', '--in'];
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(getDaisyUIColor(daisyUIColors[(startIndex + i) % daisyUIColors.length], opacity));
  }
  return colors;
};
