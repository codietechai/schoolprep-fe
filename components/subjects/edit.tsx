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
import SelectInput from '../plan-pricing/inputSelect';
import { addSubjectSchema } from '@/validations';
import Button from '../common/loader-button';
import withPermissionGuard from '@/hooks/permissions/withRoleGuard';
import CrossIcon from '../icon/icon-cross';
import { usePermissions } from '@/hooks';

const defaultQuery = DEFAULT_QUERY;

export type TEditSubject = {
  name: string;
  description?: string;
  active: string;
};

export const EditSubjectForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const subjectId = id;
  // const [tab, setTab] = useState('general');
  const [topics, setTopics] = useState<any[]>([]);
  const intialStateOfTopic = {
    title: '',
    active: true,
    subject: subjectId as string,
  };
  // const [newTopic, setNewTopic] = useState(intialStateOfTopic);
  // Fetch existing subject data
  const { data: subjectData, isLoading } = useQuery(
    ['subject', subjectId],
    () => fetchSubjectSingle(subjectId as string),
    { enabled: !!subjectId, retry: 0, refetchOnWindowFocus: false },
  );

  const { refetch } = useQuery(
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

  // const { mutate: addTopic, isLoading: addingTopic } = useMutation(
  //   addTopicRequest,
  //   {
  //     onSuccess: (res: any) => {
  //       // router.push(LINKS.subjects.route);
  //       showMessage(res.data.message || 'Topic added successfully');
  //       refetch();
  //       setNewTopic(intialStateOfTopic);
  //     },
  //     onError: (error: any) => {
  //       showMessage(error.message || 'Something went wrong!', 'error');
  //     },
  //   },
  // );

  // const { mutate: editSingleTopic } = useMutation(editTopicRequest, {
  //   onSuccess: (res: any) => {
  //     // router.push(LINKS.subjects.route);
  //     showMessage(res.data.message || 'Topic edited successfully');
  //     refetch();
  //     // setNewTopic(intialStateOfTopic);
  //   },
  //   onError: (error: any) => {
  //     showMessage(error.message || 'Something went wrong!', 'error');
  //   },
  // });

  // const { mutate: deleteTopic } = useMutation(deleteTopicRequest, {
  //   onSuccess: res => {
  //     refetch();
  //     showMessage(res.data?.message || 'Topic removed successfully');
  //   },
  // });

  // const deleteTopicConfirmation = async (id: string) => {
  //   const data = await showDeleteConfirmation(
  //     'Do you want to remove this topic?',
  //   );
  //   if (data?.isConfirmed) {
  //     deleteTopic(id);
  //   }
  // };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(addSubjectSchema),
  });

  useEffect(() => {
    if (subjectData) {
      reset({
        name: subjectData.name || '',

        description: subjectData.description || '',

        active: subjectData.active ? 'true' : 'false',
      });
    }
  }, [subjectData, reset]);

  // Mutation for editing the subject
  const { mutate: editSubject, isLoading: updatingSubject } = useMutation(
    editSubjectRequest,
    {
      onSuccess: (res: any) => {
        // router.push(LINKS.subjects.route);
        showMessage(res.data.message || 'Subject updated successfully');
      },
      onError: (error: any) => {
        showMessage(error.message || 'Something went wrong!', 'error');
      },
    },
  );

  // Form submit handler
  const onSubmit = (data: TEditSubject) => {
    let payload: any = {
      ...data,
      active: data.active === 'true', // Convert "true"/"false" to boolean
      id: subjectId,
    };
    editSubject({
      id: subjectData?._id,
      ...payload,
    } as any);
  };

  if (isLoading) return <div>Loading...</div>; // Loading indicator while fetching data

  // const EditTopic = ({
  //   topic,
  // }: {
  //   topic: { title: string; active: boolean; subject: string; _id: string };
  // }) => {
  //   const [editTopic, setEditTopic] = useState(topic);
  //   return (
  //     <div className=" mb-3 flex gap-4">
  //       <div className="relative w-[80%]">
  //         <input
  //           className="form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0"
  //           placeholder="Enter topic name"
  //           value={editTopic.title}
  //           onChange={e =>
  //             setEditTopic(prev => {
  //               return { ...prev, title: e.target.value };
  //             })
  //           }
  //         />
  //         <div
  //           className="absolute -right-3 -top-3 cursor-pointer"
  //           onClick={() => deleteTopicConfirmation(editTopic._id)}>
  //           <CrossIcon />
  //         </div>
  //       </div>
  //       <button
  //         className={`btn ${
  //           editTopic.active ? 'btn-success' : 'btn-danger'
  //         } w-[159px]`}
  //         type="button"
  //         onClick={() =>
  //           setEditTopic(prev => {
  //             return {
  //               ...prev,
  //               active: editTopic.active ? false : true,
  //             };
  //           })
  //         }>
  //         {editTopic.active ? 'Active' : 'Inactive'}
  //       </button>
  //       <button
  //         className="btn btn-primary"
  //         type="button"
  //         disabled={
  //           topic.active === editTopic.active && topic.title === editTopic.title
  //         }
  //         onClick={() => editSingleTopic({ ...editTopic })}>
  //         Save
  //       </button>
  //     </div>
  //   );
  // };

  return (
    <div className="pt-5">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 rounded-md border border-[#ebedf2] bg-white p-6 dark:border-[#191e3a] dark:bg-black">
          <div className="flex gap-4">
            {/* <h6
              className={`mb-5 cursor-pointer pb-2 text-base font-bold ${
                tab === 'general' ? 'border-b-2 border-b-primary' : ''
              }`}
              onClick={() => setTab('general')}>
              General
            </h6> */}
            <h6 className="mb-5 cursor-pointer pb-2 text-base font-bold">
              Subject
            </h6>
            {/* <h6
              className={`mb-5 cursor-pointer pb-2 text-base font-bold ${
                tab !== 'general' ? 'border-b-2 border-b-primary' : ''
              }`}
              onClick={() => setTab('topic')}>
              Topic
            </h6> */}
          </div>
          <div className="flex flex-col sm:flex-row">
            {/* {tab === 'general' ? ( */}
            <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Subject Name Input */}
              <div>
                <Input
                  inverted
                  label="Subject Name"
                  isMandatory
                  {...register('name')}
                  type="text"
                  placeholder="Enter Subject Name"
                  errorText={errors.name?.message as string}
                />
              </div>

              {/* Description Input */}
              <div>
                <Textarea
                  label="Description"
                  {...register('description')}
                  placeholder="Enter Subject Description"
                  errorText={errors.description?.message as string}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <SelectInput
                  label="Status"
                  isMandatory
                  control={control}
                  name="active"
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' },
                  ]}
                  errorText={errors.active?.message as string}
                />
              </div>

              {/* Save Button */}

              <div className="mt-3 gap-3 sm:col-span-2 md:flex">
                <Button text="Update" loader={updatingSubject} />
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="btn btn-neutral shadow-sm sm:col-span-2">
                  Cancel
                </button>
              </div>
            </div>
            {/* ) : ( */}
            {/* <div className="min-h-[300px]">
                <div className="col-span-2">
                  <label className="mb-2">Add Topics</label>
                  {topics.map((topic, index) => (
                    <EditTopic topic={topic} key={index} />
                  ))}
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
                </div>
              </div> */}
            {/* )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export const ProtectedEditSubjectForm = withPermissionGuard(
  EditSubjectForm,
  { subject: { update: true } },
  '/portal/dashboard',
);
