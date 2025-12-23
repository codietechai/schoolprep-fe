'use client';
import React, { useState } from 'react';
import IconSearch from '@/components/icon/icon-search';
import IconPlus from '@/components/icon/icon-plus';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconRestore from '@/components/icon/icon-restore';
import Button from './button';

type TProps = {
  title: string;
  search: string;
  showAdd?: boolean;
  isTrashList?: boolean;
  showTrash?: boolean;
  isHardDelete?: boolean;
  selectedRows?: any[];
  onSearch: (p: string) => void;
  onAddNew?: () => void;
  onShowTrash?: () => void;
  onMoveToTrash?: () => void;
  onRestore?: () => void;
  onDelete?: () => void;
  addText?: string;
};

export const ListHeader = ({
  title,
  search,
  showAdd = true,
  isTrashList = false,
  showTrash = false,
  selectedRows,
  isHardDelete = false,
  onSearch,
  onAddNew,
  onShowTrash,
  onMoveToTrash,
  onRestore,
  onDelete,
  addText,
}: TProps) => {
  const [componentSearch, setComponentSearch] = useState('');
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold leading-[36px] text-black">
          {title}
        </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            {selectedRows?.length && (!isTrashList || isHardDelete) ? (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onMoveToTrash}>
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  {isHardDelete ? `Delete ` : `Move To Trash `}(
                  {selectedRows?.length})
                </button>
              </div>
            ) : null}
            {selectedRows?.length && isTrashList ? (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onRestore}>
                    <IconRestore className="ltr:mr-2 rtl:ml-2" />
                    Restore ({selectedRows?.length})
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}>
                    <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                    Delete ({selectedRows?.length})
                  </button>
                </div>
              </>
            ) : null}
          </div>
          <div className="relative rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="peer form-input min-h-[30px] py-[10px] ltr:pr-11 rtl:pl-11"
              value={componentSearch}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  onSearch(componentSearch);
                }
              }}
              onChange={e => {
                setComponentSearch(e.target.value);
              }}
            />
            <button
              onClick={() => {
                // if (componentSearch) {
                onSearch(componentSearch);
                // }
              }}
              type="button"
              className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
              <IconSearch className="mx-auto" />
            </button>
          </div>
          <div className="flex gap-3">
            {showAdd && (
              <Button
                onClick={onAddNew}
                text={
                  addText
                    ? addText
                    : `ADD ${title.toUpperCase().slice(0, title.length - 1)}`
                }
                icon={!addText ? <IconPlus /> : null}
              />
            )}
            {showTrash && (
              <div>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onShowTrash}>
                  <IconTrashLines className="ltr:mr-2 rtl:ml-2" />
                  See Trash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {search && (
        <p className="mt-3 text-lg text-gray-700">
          Results for <span className="text-[#0e1726]">"{search}"</span>
        </p>
      )}
    </div>
  );
};
