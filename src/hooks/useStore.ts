import { useContext } from 'react';
import { StoreContext } from '../context/store';
import { RootStore } from '../store/store';

export const useStore = (): RootStore => useContext(StoreContext);
