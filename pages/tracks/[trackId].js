import ErrorBoundary from '@utils/ErrorBoundary';
import { getSongDetails } from '@services/songApi';
import TrackDetails from '@containers/ItunesTrackFinder/TrackDetails';

const TrackInfo = (props) => {
  return (
    <ErrorBoundary>
      <TrackDetails {...props} />
    </ErrorBoundary>
  );
};

export async function getServerSideProps(context) {
  const trackId = context.query.trackId;

  const res = await getSongDetails(trackId);

  const props = {
    fetchedTracks: {}
  };

  if (res.ok && res.data.results[0]) {
    props.fetchedTracks = res.data.results[0];
  }

  return { props };
}

export default TrackInfo;
