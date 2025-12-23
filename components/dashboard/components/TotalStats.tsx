import React, { useState } from 'react'
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import { filters } from '@/client/endpoints';

export const TotalStats = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [range, setRange] = useState('This Month');

    return (
        <div className="panel ">
            <div className="mb-5 flex justify-between dark:text-white-light">
                <h5 className="text-lg font-semibold ">Total Courses</h5>
            </div>
            <div className="  text-3xl font-bold text-[#e95f2b]">
                <span>0 </span>
            </div>
        </div>
    )
}

