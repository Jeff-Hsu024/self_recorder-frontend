export const getDaisyUIColor = (cssVar: string, opacity: number = 1) => {
  if (typeof document === 'undefined') return `rgba(0,0,0,${opacity})`;
  const colorMap: { [key: string]: string } = {
  '--p': `rgba(59, 130, 246, ${opacity})`,     // blue-500
  '--in': `rgba(96, 165, 250, ${opacity})`,    // blue-400
  '--pl': `rgba(147, 197, 253, ${opacity})`,   // blue-300
  '--s': `rgba(16, 185, 129, ${opacity})`,     // emerald-500
  '--su': `rgba(34, 197, 94, ${opacity})`,     // green-500
  '--sg': `rgba(134, 239, 172, ${opacity})`,   // green-300
  '--a': `rgba(239, 68, 68, ${opacity})`,      // red-500
  '--ar': `rgba(251, 113, 133, ${opacity})`,   // red-400
  '--er': `rgba(220, 38, 38, ${opacity})`,     // red-600
  '--wa': `rgba(251, 191, 36, ${opacity})`,    // yellow-500
  '--yl': `rgba(253, 224, 71, ${opacity})`,    // yellow-400
  '--og': `rgba(251, 146, 60, ${opacity})`,    // orange-500
  '--cy': `rgba(6, 182, 212, ${opacity})`,     // cyan-500
  '--np': `rgba(107, 114, 128, ${opacity})`,   // gray-500
  '--nf': `rgba(243, 244, 246, ${opacity})`,   // gray-100
  '--dk': `rgba(55, 65, 81, ${opacity})`,      // gray-700
  '--pu': `rgba(139, 92, 246, ${opacity})`,    // purple-500
  '--p1': `rgba(37, 99, 235, ${opacity})`,     // blue-600
  '--p2': `rgba(147, 197, 253, ${opacity})`,   // blue-300
  '--p3': `rgba(191, 219, 254, ${opacity})`,   // blue-200
  '--s1': `rgba(5, 150, 105, ${opacity})`,     // emerald-600
  '--s2': `rgba(110, 231, 183, ${opacity})`,   // emerald-300
  '--su1': `rgba(22, 163, 74, ${opacity})`,    // green-600
  '--su2': `rgba(132, 204, 22, ${opacity})`,   // lime-500
  '--a1': `rgba(220, 38, 38, ${opacity})`,     // red-600
  '--a2': `rgba(254, 202, 202, ${opacity})`,   // red-200
  '--wa1': `rgba(202, 138, 4, ${opacity})`,    // yellow-700
  '--wa2': `rgba(253, 230, 138, ${opacity})`,  // yellow-300
  '--og1': `rgba(234, 88, 12, ${opacity})`,    // orange-600
  '--og2': `rgba(255, 159, 98, ${opacity})`,   // orange-300
  '--cy1': `rgba(8, 145, 178, ${opacity})`,    // cyan-600
  '--cy2': `rgba(132, 232, 244, ${opacity})`,  // cyan-300
  '--pu1': `rgba(124, 58, 237, ${opacity})`,   // purple-600
  '--pu2': `rgba(196, 181, 253, ${opacity})`,  // purple-300
  '--np1': `rgba(75, 85, 99, ${opacity})`,     // gray-600
  '--np2': `rgba(209, 213, 219, ${opacity})`,  // gray-300
  '--nf1': `rgba(249, 250, 251, ${opacity})`,  // gray-50
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
