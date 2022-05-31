/**
 *
 * TrackDetailsPage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import Head from 'next/Head';
import Link from 'next/link';
import { Skeleton } from 'antd';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';

import If from '@components/If';
import MusicCard from '@components/MusicCard';
import Text from '@app/components/Text';
import { useInjectSaga } from '@utils/injectSaga';
import { styles, colors, media } from '@app/themes';
import saga from '@containers/ItunesTrackFinder/saga';
import { searchContainerCreators } from '@containers/ItunesTrackFinder/reducer';
import { selectItunesData, selectItunesError, selectTrackDetails } from '@app/containers/ItunesTrackFinder/selectors';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #111;
  border-radius: 10px;
  max-width: 85%;
  margin: 1rem auto;
  ${styles.primaryBackgroundColor};
  box-shadow: 0 0 5px rgba(2, 2, 2, 0.2);
`;
const Heading = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0.5rem 0;
`;
const Bold = styled.p`
  font-weight: bold;
  font-family: sans-serif;
  margin-top: 0.75rem;
`;
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  /* ${media.lessThan('desktop')`
      flex-wrap: wrap;
    `} */
`;
const Body = styled.div`
  padding: 1rem;
  width: 30%;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 2px #222;

  /* ${media.lessThan('desktop')`
      width: 100%;
    `} */
`;
const Music = styled.div`
  width: 70%;

  /* ${media.lessThan('desktop')`
      width: 100%;
    `} */
`;

function SongDetailsPage({ intl, dispatchGetSongDetails, songsData, trackDetails, songsError }) {
  useInjectSaga({ key: 'searchContainer', saga });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const router = useRouter();

  const trackId = router.query.trackId;

  useEffect(() => {
    if (isEmpty(songsData)) {
      dispatchGetSongDetails(trackId);
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackDetails, songsError]);

  useEffect(() => {
    const loaded = !isEmpty(songsData) || !isEmpty(trackDetails) || songsError;

    if (loaded) {
      setLoading(false);
      if (songsData[trackId]) {
        setData({ ...songsData[trackId] });
      } else {
        setData(trackDetails);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackDetails, songsError]);

  return (
    <Container>
      <Head>
        <title>{data.trackName}</title>
        <meta name="description" content={data.shortDescription} />
      </Head>

      <If condition={!isEmpty(data) || loading}>
        <Skeleton loading={loading} active>
          <Link href="/">{intl.formatMessage({ id: 'go_home_button_text' })}</Link>

          <Heading>{data.artistName}</Heading>

          <FlexView>
            <Body>
              <If condition={data.collectionName}>
                <Bold>{intl.formatMessage({ id: 'track_collection' }) + ':  '}</Bold>{' '}
                <Text text={data.collectionName} />
              </If>

              <If condition={data.trackName}>
                <Bold>{intl.formatMessage({ id: 'track_name' }) + ':  '}</Bold> <Text text={data.trackName} />
              </If>

              <If condition={data.trackPrice && data.currency}>
                <Bold>{intl.formatMessage({ id: 'track_price' }) + ':  '}</Bold>{' '}
                <Text text={'' + data.trackPrice + data.currency} />
              </If>

              <If condition={data.primaryGenreName}>
                <Bold>{intl.formatMessage({ id: 'track_genre' }) + ':  '}</Bold> <Text text={data.primaryGenreName} />
              </If>
            </Body>

            <Music>
              <MusicCard {...data} intl={intl} />
            </Music>
          </FlexView>
        </Skeleton>
      </If>
    </Container>
  );
}

SongDetailsPage.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  trackDetails: PropTypes.object,
  songsError: PropTypes.string,
  songsData: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  trackDetails: selectTrackDetails(),
  songsError: selectItunesError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails } = searchContainerCreators;

  return {
    dispatchGetSongDetails: (trackId) => dispatch(requestGetSongDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, memo)(SongDetailsPage);

export const SongDetailsPageTest = compose(injectIntl)(SongDetailsPage);
