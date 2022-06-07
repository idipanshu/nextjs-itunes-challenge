import { getSongDetails } from '@services/songApi';
import TrackDetails from '@containers/ItunesTrackFinder/TrackDetails';

const TrackInfo = (props) => {
  return <TrackDetails {...props} />;
};

export async function getServerSideProps(context) {
  const trackId = context.query.trackId;

  const res = await getSongDetails(trackId);

  return {
    props: {
      fetchedTracks: res.data.results[0]
    }
  };
}

export default TrackInfo;
