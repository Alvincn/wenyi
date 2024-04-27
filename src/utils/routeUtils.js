import { useNavigationState } from '@react-navigation/native';

export const useCurrentRoute = () => {
  const navigationState = useNavigationState(state => state);
  try{
    return navigationState.routes[navigationState.index].state.routes[navigationState.routes[navigationState.index].state.index].name;
  }catch (err) {
    return null
  }
};