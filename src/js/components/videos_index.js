'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { dispatchMerge } = require('../helpers/dispatch_helpers');
const VideosActions = require('../actions/videos_actions');
const VideoRow = require('./video_row');

const mapStateToProps = function(state){
  return {
    videos: state.videos,
    video: state.video
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    updateVideos: dispatchMerge(dispatch, 'videos')
  };
};

class VideosIndex extends React.PureComponent{
  componentWillMount(){
    VideosActions.index().then(videos => {
      this.props.updateVideos(videos)
    })
  }
  render(){
    const videos = this.props.videos.map((video, index) => {
      return <VideoRow key={video.get('id')} video={video} index={index}/>
    });

    return(
      <div className="videos-index">
        <h2>{this.props.video.get('name') || 'Select a video below to get started'}</h2>
        <div className={"video-player-wrapper " + (this.props.video.get('id') ? '' : 'hidden')}>
          <iframe src={this.props.video.get('src')} title="Trainer Zone" allowTransparency="true" frameBorder="0" scrolling="no" className="wistia_embed" name="wistia_embed" allowFullScreen width="640" height="360"></iframe>
          <script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>
        </div>
        <div className="ruler"></div>
        <div className={"list-title " + (this.props.video.get('id') ? '' : 'hidden')}>Video Selection</div>
        {videos}
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(VideosIndex);