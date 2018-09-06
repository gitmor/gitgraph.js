var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#F85BB5", "#FFA657", "#9993FF" ],
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

var severeBugFixComment = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Severe BugFix Commit(s)"
};

// You can manually fix columns to control the display.
var masterCol = 4;
var developCol = 3;
var featureCol = 2;
var releaseCol = 1;
var hotfixCol = 0;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");

var develop = gitgraph.branch({
  parentBranch: master,
  name: "develop",
  column: developCol
});
develop.commit({
  messageDisplay: false
});

var feature1 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/1",
  column: featureCol
});
feature1.commit("A feature to go into v1.0.0").commit({
  messageDisplay: false
});
feature1.merge(develop);

var release_100 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.0.0",
  column: releaseCol
});
release_100.commit({
  message: "Start v1.0.0-rc Release Candidate builds",
  tag: "v1.0.0-rc",
  tagColor: 'gray'
});
develop.commit({
  messageDisplay: false
});
release_100.commit(stabilizationCommit);
release_100.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v1.0.0 tagged",
  tag: "v1.0.0"
});
master.merge(develop);

develop.commit({
  messageDisplay: false
});

var hotfix_101 = gitgraph.branch({
  parentBranch: master,
  name: "hotfix/v1.0.1",
  column: hotfixCol
});

hotfix_101.commit(severeBugFixComment);

hotfix_101.merge(master, {
  dotStrokeWidth: 10,
  message: "Hotfix v1.0.1 tagged",
  tag: "v1.0.1"
});
master.merge(develop);

develop.commit({
  messageDisplay: false
});


var feature3 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/3",
  column: featureCol
});

feature3.commit("A feature to go into v1.1.0").commit({
  messageDisplay: false
});
feature3.merge(develop);

var release_110 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.1.0",
  column: releaseCol
});
release_110.commit({
  message: "Start v1.1.0-rc Release Candidate builds",
  tag: "v1.1.0-rc",
  tagColor: 'gray'
})
release_110.commit(stabilizationCommit);
release_110.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v1.1.0 tagged",
  tag: "v1.1.0"
});
master.merge(develop);

develop.commit({
  messageDisplay: false
});

var feature4 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/4",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature4.commit("A feature to go into v2.0.0").commit({
  messageDisplay: false
});
feature4.merge(develop);

develop.commit({
  messageDisplay: false
});

var release_200 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v2.0.0",
  column: releaseCol
});
release_200.commit({
  message: "Start v2.0.0-rc Release Candidate builds",
  tag: "v2.0.0-rc",
  tagColor: 'gray'
})
release_200.commit(stabilizationCommit);
release_200.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v2.0.0 tagged",
  tag: "v2.0.0"
});
master.merge(develop);
