// export async function getStaticProps() {
//   const recommendations = await getReccomendations();
//   return {
//     props: {
//       recommendations
//     }
//   };
// }

// export function ReposPage({ recommendations }) {
//   return <Repos recommendations={recommendations} />;
// }

// ReposPage.propTypes = {
//   recommendations: PropTypes.arrayOf(
//     PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
//   )
// };

import React, { useState, useEffect, memo, useMemo } from 'react';
import Head from 'next/Head';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { isEmpty, debounce } from 'lodash';
import { Card, Input, Skeleton } from 'antd';
import { createStructuredSelector } from 'reselect';

import If from '@components/If';
import saga from '@app/store/sagas/app';
import MusicCard from '@components/MusicCard';
import { useInjectSaga } from '@utils/injectSaga';
import { searchContainerCreators } from '@containers/ItunesTrackFinder/reducer';
import { selectSearchedTerm, selectItunesData, selectItunesError } from '@app/containers/ItunesTrackFinder/selectors';

const Container = styled.div`
  max-width: 85%;
  margin: 1rem auto;
  padding: 0.5rem;
`;
const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0.7rem;
`;
const SearchCard = styled(Card)`
  && {
    padding: 0.1rem;
    margin: 1rem 0;
    background-color: #fafafa;
  }
`;
const InputField = styled(Input)`
  && {
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    color: #222;
  }
`;

export function App({ intl, dispatchGetItunesTracks, dispatchClearItunesTracks, songsData, searchedTerm, songsError }) {
  useInjectSaga({ key: 'searchContainer', saga });

  const [loading, setLoading] = useState(false);
  const [playTrackEvent, setPlayTrackEvent] = useState('');

  const tracks = Object.entries(songsData);

  const audioRef = useMemo(() => {
    if (!songsData) {
      return;
    }

    const refs = {};
    tracks.map((track) => {
      refs[track[0]] = React.createRef(null);
    });
    return refs;
  }, [songsData]);

  useEffect(() => {
    const loaded = (songsData && Object.keys(songsData).length > 0) || songsError;

    if (loaded) {
      setLoading(false);
    }
  }, [songsData]);

  function handleOnChange(searchString) {
    if (!isEmpty(searchString)) {
      dispatchGetItunesTracks(searchString);
      setLoading(true);
    } else {
      dispatchClearItunesTracks();
    }
  }

  function handlePlayTrackEvent(trackId) {
    if (playTrackEvent !== '' && playTrackEvent !== trackId) {
      audioRef[playTrackEvent].current.pause();
    }

    setPlayTrackEvent(trackId);
  }

  const debounceOnChange = debounce(handleOnChange, 500);

  return (
    <Container>
      <Head>
        <title>{intl.formatMessage({ id: 'website_tab_title' })}</title>
        <meta name="description" content={intl.formatMessage({ id: 'website_meta' })} />
      </Head>

      <SearchCard>
        <InputField
          data-testid="search-input"
          placeholder={intl.formatMessage({ id: 'itunes_search_input_placeholder' })}
          onChange={(e) => debounceOnChange(e.target.value)}
          defaultValue={searchedTerm}
        />
      </SearchCard>

      <If condition={!isEmpty(songsData) || loading}>
        <Skeleton loading={loading} active>
          <GridView>
            {tracks.map((track, index) => (
              <MusicCard
                intl={intl}
                short
                key={index}
                {...track[1]}
                loading={loading}
                playTrackEvent={handlePlayTrackEvent}
                reference={audioRef}
              />
            ))}
          </GridView>
        </Skeleton>
      </If>
    </Container>
  );
}

App.propTypes = {
  intl: PropTypes.object,
  dispatchGetItunesTracks: PropTypes.func,
  dispatchClearItunesTracks: PropTypes.func,
  songsData: PropTypes.object,
  songsError: PropTypes.string,
  searchedTerm: PropTypes.string
};

App.defaultProps = {
  songsData: {}
};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  songsError: selectItunesError(),
  searchedTerm: selectSearchedTerm()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = searchContainerCreators;

  return {
    dispatchGetItunesTracks: (searchString) => dispatch(requestGetSongs(searchString)),
    dispatchClearItunesTracks: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, memo)(App);

export const SearchContainerTest = compose(injectIntl)(App);
