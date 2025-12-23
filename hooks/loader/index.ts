import { create } from 'zustand';

type TGlobalLoaderState = {
  showLoader: boolean;
  setShowLoader: (val: boolean) => void;
};

type TCourseState = {
  courseId: string;
  setCourseId: (val: string) => void;
};

interface ChatState {
  receiverId: string;
  setRecieverId: (user: string) => void;
}

type TGlobalSocketState = {
  socket: any;
  setSocket: (val: any) => void;
};

export const useGlobalLoader = create<TGlobalLoaderState>(set => ({
  showLoader: false,
  setShowLoader: val => set(() => ({ showLoader: val })),
}));

export const useContainerLoader = create<TGlobalLoaderState>(set => ({
  showLoader: false,
  setShowLoader: val => set(() => ({ showLoader: val })),
}));

export const useCourseId = create<TCourseState>(set => ({
  courseId: '',
  setCourseId: val => set(() => ({ courseId: val })),
}));

export const useGlobalSocket = create<TGlobalSocketState>(set => ({
  socket: null,
  setSocket: (val: any) => set(() => ({ socket: val })),
}));

export const useMessageStore = create<ChatState>((set: any) => ({
  receiverId: '',

  setRecieverId: user =>
    set(() => ({
      receiverId: user,
    })),
}));
