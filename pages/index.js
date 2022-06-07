// eslint-disable-next-line import/no-named-as-default
import SearchTracks from '@containers/ItunesTrackFinder/SearchTracks';
import ErrorBoundary from '@utils/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <SearchTracks />;
  </ErrorBoundary>
);

export default App;
