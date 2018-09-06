var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#F85BB5", "#FFA657", "#F85BB5" ],
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true, // display branch names on graph
    labelFont: "normal 10pt Arial",
    labelRotation: 0
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: "#000000",
      strokeWidth: 4
    },
    tag: {
      font: "normal 10pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "normal 12pt Arial",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  //mode: "extended",
  //orientation: "horizontal"
  orientation: "vertical"
};

var bugFixCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Bug fix commit(s)"
};

var stabilizationCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Release stabilization commit(s)"
};

// You can manually fix columns to control the display.
var releaseCol = 2;
var featureCol = 3;
var masterCol = 4;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");

var feature1 = gitgraph.branch({
  parentBranch: master,
  name: "feature/1",
  column: featureCol
});
feature1.commit("A feature to go into v1.0.0").commit({
  messageDisplay: false
});
feature1.merge(master);

var feature2 = gitgraph.branch({
  parentBranch: master,
  name: "feature/2",
  column: featureCol
});
feature2.commit("Another feature to go into v1.0.0").commit({
  messageDisplay: false
});
feature2.merge(master);

var release_100 = gitgraph.branch({
  parentBranch: master,
  name: "release/v1.0.0",
  column: releaseCol
});
release_100.commit({
  message: "Start v1.0.0-rc Release Candidate builds",
  tag: "v1.0.0-rc",
  tagColor: 'gray'
});

release_100.commit(stabilizationCommit);
release_100.commit({
  message: "Release v1.0.0 tagged",
  tag: "v1.0.0"
});


master.commit("Fix needs to be cherry picked & put in release branch");

master.merge(release_100, {
  dotStrokeWidth: 10,
  message: "Release v1.0.1 tagged",
  tag: "v1.0.1"
});

var feature3 = gitgraph.branch({
  parentBranch: master,
  name: "feature/3",
  column: featureCol
});

feature3.commit("A feature to go into v1.1.0").commit({
  messageDisplay: false
});
feature3.merge(master);

var release_110 = gitgraph.branch({
  parentBranch: master,
  name: "release/v1.1.0",
  column: releaseCol
});
release_110.commit({
  message: "Start v1.1.0-rc Release Candidate builds",
  tag: "v1.1.0-rc",
  tagColor: 'gray'
})
release_110.commit(stabilizationCommit);

release_110.commit("HotFix in release branch only, not going to put this thing in master");

release_110.commit({
  dotStrokeWidth: 10,
  message: "Release v1.1.1tagged",
  tag: "v1.1.1"
});

var feature4 = gitgraph.branch({
  parentBranch: master,
  name: "feature/4",
  column: featureCol
});
master.commit({
  messageDisplay: false
});
feature4.commit("A feature to go into v2.0.0").commit({
  messageDisplay: false
});
feature4.merge(master);

var feature5 = gitgraph.branch({
  parentBranch: master,
  name: "feature/5",
  column: featureCol
});
master.commit({
  messageDisplay: false
});
feature5.commit("Another feature to go into v1.2.0").commit({
  messageDisplay: false
});
feature5.merge(master);

var release_200 = gitgraph.branch({
  parentBranch: master,
  name: "release/v2.0.0",
  column: releaseCol
});
release_200.commit({
  message: "Start v2.0.0-rc Release Candidate builds",
  tag: "v2.0.0-rc",
  tagColor: 'gray'
})
release_200.commit(stabilizationCommit);

var feature6 = gitgraph.branch({
  parentBranch: master,
  name: "feature/6",
  column: featureCol
});
feature6.commit("Feature to go into v2.0.0").commit({
  messageDisplay: false
});
feature6.merge(master);

var release_210 = gitgraph.branch({
  parentBranch: master,
  name: "release/v2.1.0",
  column: releaseCol
});
release_210.commit({
  message: "Start v2.1.0-rc Release Candidate builds",
  tag: "v2.1.0-rc",
  tagColor: 'gray'
})
release_210.commit(stabilizationCommit);



