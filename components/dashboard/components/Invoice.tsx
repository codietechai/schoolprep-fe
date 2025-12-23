import React, { useState } from 'react';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { filters } from '@/client/endpoints';

export const Invoice = () => {
  const [range, setRange] = useState('This Month');
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  return (
    <div className="panel  sm:col-span-2 lg:col-span-1">
      {/* statistics */}
      <div className="mb-5 flex justify-between dark:text-white-light">
        <h5 className="text-lg font-semibold ">Invoices <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">({range})</span></h5>
        <div className="dropdown">
          <Dropdown
            offset={[0, 5]}
            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
            btnClassName="hover:text-primary"
            button={
              <IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />
            }>
            <ul>
              {filters.map((e, i) => (
                <li key={i}>
                  <button type="button" onClick={() => setRange(e)}>{e}</button>
                </li>
              ))}

            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="grid gap-8 text-sm font-bold text-[#515365] sm:grid-cols-2">
        <div>
          <div>
            <div>Paid</div>
            <div className="text-lg text-[#f8538d]">15</div>
          </div>
        </div>
        <div>
          <div>
            <div>Unpaid</div>
            <div className="text-lg text-[#f8538d]">22</div>
          </div>
        </div>
      </div>
    </div>
  );
};
