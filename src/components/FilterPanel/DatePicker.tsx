
import { useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useProductStore } from '../../store/product.store';

const DatePicker = () => {
  const { dateRange, setFilter } = useProductStore((state) => ({
    dateRange: state.filters.dateRange,
    setFilter: state.setFilter,
  }));

  const [state, setState] = useState([
    {
      startDate: dateRange?.startDate ?? new Date(),
      endDate: dateRange?.endDate ?? new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    const startDate = selection.startDate ?? state[0].startDate;
    const endDate = selection.endDate ?? state[0].endDate;

    setState([{ ...state[0], startDate, endDate }]);
    setFilter('dateRange', {
      startDate,
      endDate,
    });
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Filter by Date Range</h3>
      <div className="max-w-full overflow-hidden">
        <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DatePicker;
