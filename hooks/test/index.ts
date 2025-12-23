import { useGlobalSocket } from '../loader';

const useListenTests = () => {
  const socket = useGlobalSocket(state => {
    return state.socket;
  });
};

export default useListenTests;
