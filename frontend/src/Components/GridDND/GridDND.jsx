import React from "react";
import { GridLayout, GridDiv } from "./GridDNDStyle";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Fab } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import TwitterLikes from "../Analytics/TwitterLikes";
import DraftPlatforms from "../Analytics/DraftPlatforms";
import TwitterTotalLikesRetweets from "../Analytics/TwitterTotalLikesRetweets";
import TwitterPercentages from "../Analytics/TwitterPercentages";
import LastMulipostEngagement from "../Analytics/LastMulipostEngagement";
import TwitterPostList from "../../Components/PostLists/TwitterPostList";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

export default class GridDND extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      editGrid: false,
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 },
      rows: { lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 10,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  onResize = (layouts) => {
    this.setState({
      layout: layouts,
    });
  };

  toggleEditGrid = () => {
    this.setState({
      editGrid: !this.state.editGrid,
    });
  };

  render() {
    return (
      <GridLayout layout>
        <div>
          <Fab
            color="primary"
            onClick={this.toggleEditGrid}
            style={{
              zIndex: "100",
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            {this.state.editGrid ? (
              <Save className="Icon" />
            ) : (
              <Edit className="Icon" />
            )}
          </Fab>
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          id="Resizable"
          cols={{ lg: 50, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={10}
          onResize={this.onResize}
          layouts={this.state.layouts}
          isResizable={this.state.editGrid}
          isDraggable={this.state.editGrid}
          isRearrangeable={this.state.editGrid}
          compactType={null}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <GridDiv key="1" data-grid={{ w: 25, h: 48, x: 25, y: 33 }}>
            <span className="Large" id="postCreation">
              <h6>Latest Multi-Post preformance</h6>
              <LastMulipostEngagement />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="2" data-grid={{ w: 25, h: 22, x: 0, y: 0 }}>
            <span className="Large">
              <h6>Likes on your last 5 posts</h6>
              <TwitterLikes />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="3" data-grid={{ w: 25, h: 23, x: 0, y: 22 }}>
            <span className="Large">
              <h6>Draft Platform distribution</h6>
              <DraftPlatforms />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="4" data-grid={{ w: 25, h: 25, x: 25, y: 0 }}>
            <span className="Large">
              <h6>Total Likes and Retweets</h6>
              <TwitterTotalLikesRetweets />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="5" data-grid={{ w: 25, h: 8, x: 25, y: 25 }}>
            <span className="Large">
              <TwitterPercentages />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
          <GridDiv key="6" data-grid={{ w: 25, h: 8, x: 0, y: 40 }}>
            <span className="Large">
              <TwitterPostList />
            </span>
            {this.state.editGrid && <div className="movingOverlay" />}
          </GridDiv>
        </ResponsiveReactGridLayout>
      </GridLayout>
    );
  }
}

/* function getFromDB(key){
  let ls = {};
  if (UserData.dashboard){
    try {
      ls = JSON.parse(global.localStorage.getItem("dashboard")) || {};
    } catch (e) {}
  }
  return ls[key];
  } */

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("dashboard")) || {};
    } catch (e) {}
  }
  return ls[key];
}

/* function saveToDB(key, value){
  if (UserData.dashboard){
    global.localStorage.setItem(
      "dashboard",
      JSON.stringify({
        [key]: value,
      })
    );
  } */

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "dashboard",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../test-hook.jsx").then((fn) => fn.default(GridDND));
}
