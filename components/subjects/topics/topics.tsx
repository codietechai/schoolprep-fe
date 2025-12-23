'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Textarea } from '@/components/common';
import { showDeleteConfirmation, showMessage } from '@/utils';
import { DEFAULT_QUERY } from '@/constants';
import {
  editSubjectRequest,
  fetchSubjectSingle,
  FETCH_TOPICS_KEY,
  fetchTopics,
  addTopicRequest,
  editTopicRequest,
  deleteTopicRequest,
} from '@/client/endpoints';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';
import Button from '@/components/common/loader-button';
import CrossIcon from '@/components/icon/icon-cross';
import { usePermissions } from '@/hooks';
import Loader from '@/components/common/Loader';

const defaultQuery = DEFAULT_QUERY;

export type TEditSubject = {
  name: string;
  description?: string;
  active: string;
};

export const TopicForm = () => {
  const { id } = useParams();
  const subjectId = id;
  const { hasPermission } = usePermissions();
  const isUpdate = hasPermission('subject', 'update');
  const isCreate = hasPermission('subject', 'create');
  const isDelete = hasPermission('subject', 'delete');
  const [topics, setTopics] = useState<any[]>([]);
  const intialStateOfTopic = {
    title: '',
    active: true,
    subject: subjectId as string,
  };
  const [newTopic, setNewTopic] = useState(intialStateOfTopic);
  // Fetch existing subject data

  const { refetch, isLoading } = useQuery(
    [FETCH_TOPICS_KEY, subjectId],
    () => fetchTopics(subjectId as string),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess(data) {
        setTopics(data.data);
      },
    },
  );

  const { mutate: addTopic, isLoading: addingTopic } = useMutation(
    addTopicRequest,
    {
      onSuccess: (res: any) => {
        // router.push(LINKS.subjects.route);
        showMessage(res.data.message || 'Topic added successfully');
        refetch();
        setNewTopic(intialStateOfTopic);
      },
      onError: (error: any) => {
        showMessage(error.message || 'Something went wrong!', 'error');
      },
    },
  );

  const { mutate: editSingleTopic } = useMutation(editTopicRequest, {
    onSuccess: (res: any) => {
      // router.push(LINKS.subjects.route);
      showMessage(res.data.message || 'Topic edited successfully');
      refetch();
      // setNewTopic(intialStateOfTopic);
    },
    onError: (error: any) => {
      showMessage(error.message || 'Something went wrong!', 'error');
    },
  });

  const { mutate: deleteTopic } = useMutation(deleteTopicRequest, {
    onSuccess: res => {
      refetch();
      showMessage(res.data?.message || 'Topic removed successfully');
    },
  });

  const deleteTopicConfirmation = async (id: string) => {
    const data = await showDeleteConfirmation(
      'Do you want to remove this topic?',
    );
    if (data?.isConfirmed) {
      deleteTopic(id);
    }
  };

  const EditTopic = ({
    topic,
  }: {
    topic: { title: string; active: boolean; subject: string; _id: string };
  }) => {
    const [editTopic, setEditTopic] = useState(topic);
    return (
      <div className=" mb-3 flex gap-4">
        <div className="relative w-[80%]">
          <input
            className="form-input w-full min-w-[300px] bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0"
            placeholder="Enter topic name"
            disabled={!isUpdate}
            value={editTopic.title}
            onChange={e =>
              setEditTopic(prev => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          {isDelete && (
            <div
              className="absolute -right-3 -top-3 cursor-pointer"
              onClick={() => deleteTopicConfirmation(editTopic._id)}>
              <CrossIcon />
            </div>
          )}
        </div>
        {isUpdate && (
          <>
            <button
              className={`btn ${
                editTopic.active ? 'btn-success' : 'btn-danger'
              } w-[159px]`}
              type="button"
              onClick={() =>
                setEditTopic(prev => {
                  return {
                    ...prev,
                    active: editTopic.active ? false : true,
                  };
                })
              }>
              {editTopic.active ? 'Active' : 'Inactive'}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={
                topic.active === editTopic.active &&
                topic.title === editTopic.title
              }
              onClick={() => editSingleTopic({ ...editTopic })}>
              Save
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="pt-5">
      <div>
        <form className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <div className="flex gap-4">
            <h6 className="mb-5 cursor-pointer pb-2 text-base font-bold">
              Topics
            </h6>
          </div>
          {!isLoading ? (
            <div className="flex flex-col sm:flex-row">
              <div className="min-h-[300px]">
                <div className="col-span-2">
                  {isCreate && <label className="mb-2">Add Topics</label>}
                  {topics.map((topic, index) => (
                    <EditTopic topic={topic} key={index} />
                  ))}
                  {isCreate && (
                    <div className="mb-3 flex gap-4">
                      <div className="w-[80%]">
                        <input
                          className="form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0"
                          placeholder="Enter option"
                          value={newTopic.title}
                          onChange={e => {
                            setNewTopic(prev => {
                              return { ...prev, title: e.target.value };
                            });
                          }}
                        />
                      </div>
                      <button
                        className={`btn ${
                          newTopic.active ? 'btn-success' : 'btn-danger'
                        } w-[159px]`}
                        type="button"
                        onClick={() =>
                          setNewTopic(prev => {
                            return {
                              ...prev,
                              active: newTopic.active ? false : true,
                            };
                          })
                        }>
                        {newTopic.active ? 'Active' : 'Inactive'}
                      </button>
                      <Button
                        type="button"
                        text="Add"
                        loader={addingTopic}
                        onClick={() => addTopic(newTopic)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </form>
      </div>
    </div>
  );
};

export const ProtectedTopicForm = withPermissionGuard(
  TopicForm,
  { subject: { read: true } },
  '/portal/dashboard',
);
