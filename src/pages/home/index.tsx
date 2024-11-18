import { HomeProvider } from './components/provider';
import { Main } from './Main';

export const WalkPage = () => {
  return (
    <HomeProvider>
      <Main />
    </HomeProvider>
  );
};
