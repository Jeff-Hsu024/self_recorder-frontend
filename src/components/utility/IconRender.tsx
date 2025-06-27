import React from 'react';
import {
  MdFastfood,
  MdKingBed,
  MdMonitorWeight,
  MdFitnessCenter,
  MdArrowUpward,
  MdArrowDownward,
  MdFilterList,
  MdSearch,
  MdCalendarMonth,
  MdBarChart,
  MdList,
} from 'react-icons/md';

interface IconRenderProps {
  iconName: string;
  className?: string;
}

const IconRender: React.FC<IconRenderProps> = ({ iconName, className }) => {
  switch (iconName) {
    case 'MdFastfood':
      return <MdFastfood className={className} />;
    case 'MdKingBed':
      return <MdKingBed className={className} />;
    case 'MdMonitorWeight':
      return <MdMonitorWeight className={className} />;
    case 'MdFitnessCenter':
      return <MdFitnessCenter className={className} />;
    case 'MdArrowUpward':
      return <MdArrowUpward className={className} />;
    case 'MdArrowDownward':
      return <MdArrowDownward className={className} />;
    case 'MdFilterList':
      return <MdFilterList className={className} />;
    case 'MdSearch':
      return <MdSearch className={className} />;
    case 'MdCalendarMonth':
      return <MdCalendarMonth className={className} />;
    case 'MdBarChart':
      return <MdBarChart className={className} />;
    case 'MdList':
      return <MdList className={className} />;
    default:
      return null;
  }
};

export default IconRender;
