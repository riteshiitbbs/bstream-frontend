/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Img from 'components/Img';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import _ from 'lodash';
import ReactAudioPlayer from 'react-audio-player'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedTrack } from './selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AudioPlayerBar = styled.div`
  border-top: 1px solid #ccc;
  position: relative;
  padding: 10px 20px;
  text-align: center;
`;

const AudioPlayerBarInner = styled.div`
  max-width: 960px;
`;

const TrackInfo = styled.div`
  display: inline-block;
  margin-left: 30px;
`;

const TrackLabel = styled.div`
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
`;


const AlbumPreviewImg = styled(Img)`
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
`;



export function App(props) {
  console.log(props.selectedTrack);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header />
      {props.selectedTrack &&
        <AudioPlayerBar>
          <AudioPlayerBarInner>
            <ReactAudioPlayer id="musicPlayer"
              src={_.get(props.selectedTrack, 'preview_url')}
              autoPlay
            /> <TrackInfo>
              <AlbumPreviewImg src={_.get(props.selectedTrack, 'album.images[0].url')} />
              <TrackLabel>{_.get(props.selectedTrack, 'name')} - {_.get(props.selectedTrack, 'artists[0].name')}</TrackLabel>
            </TrackInfo>
          </AudioPlayerBarInner>
        </AudioPlayerBar>
      }
      {React.Children.toArray(props.children)}
      <Footer />
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  selectedTrack: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedTrack: makeSelectSelectedTrack(),
});

// export default withProgressBar(App);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(withProgressBar(App));

