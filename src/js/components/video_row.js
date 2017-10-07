'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { dispatchMerge } = require('../helpers/dispatch_helpers');
const RetinaImage = require('react-retina-image');

const mapStateToProps = function(state){
  return {
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    updateVideo: dispatchMerge(dispatch, 'video')
  };
};

class VideoRow extends React.PureComponent{
  clickHandler(video){
    this.props.updateVideo(video)
  }

  render(){
    const secondsToHHMMSS = (seconds) => {
      var h = Math.floor(seconds / 3600);
      var m = Math.floor(seconds % 3600 / 60);
      var s = Math.floor(seconds % 3600 % 60);
      if (h === 0) {
        return `00${m}`.slice(-2) + ":" + `00${s}`.slice(-2);
      } else {
        return `00${h}`.slice(-2) + ":" + `00${m}`.slice(-2) + ":" + `00${s}`.slice(-2);
      }
    }
      
    return(
      <div className="video-row" onClick={this.clickHandler.bind(this, this.props.video)}>
        <div className="video-panel">
          <div className="left-content">
            <RetinaImage src="/assets/images/icn_play.png" checkIfRetinaImgExists={true} className="play-icon"/>
            <span className="video-name">{this.props.index + 1}. {this.props.video.get('name')}</span>
          </div>
          <span className="seconds">({secondsToHHMMSS(this.props.video.get('seconds'))})</span>
        </div>
      </div>
    )
      
    // }
      
  }
};

module.exports = connect(mapStateToProps,mapDispatchToProps)(VideoRow);