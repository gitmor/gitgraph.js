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
    spacingY: -40,
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
  mode: "extended",
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
var featureCol = 0;
var developCol = 1;
var releaseCol = 2;
var supportCol = 3;
var support2Col = 5;
var masterCol = 4;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");

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

master.commit("Oops missed something, commit fixes");

master.commit("Cute new feature that all the cool cats are going to like");

master.commit("Some random & not so important bug fix");

master.commit("Cute new feature that all the cool dogs are going to like");

master.commit("What are the chances of this bug? Like 1 in a million! Fix needs to be cherry picked & put in release branch");

master.merge(release_100, {
  dotStrokeWidth: 10,
  message: "Release v1.0.0 tagged",
  tag: "v1.0.0"
});

master.commit("Another bug which needs to be cherry picked & put in release branch by release engineers");

master.merge(release_100, {
  dotStrokeWidth: 10,
  message: "Release v1.0.1 tagged",
  tag: "v1.0.1"
});

master.commit("Oops missed something, commit fixes");

master.commit("Ok, this is a very useful feature that users have been asking for a long time. Time for a release");


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

master.commit("Cool new feature that is going to go viral I am sure, but mgmt not sure, so no release yet.");

master.commit("Serious defect fix, needs to be cherry picked into release");
master.merge(release_110, {
  dotStrokeWidth: 10,
  message: "Release v1.1.1 tagged",
  tag: "v1.1.1"
});


master.commit("Ok this is another cool new feature & we are also creating release branch.");

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

master.commit("System test team just found a major issue. Cherry pick.");
master.merge(release_200, {
  dotStrokeWidth: 10,
  message: "Release v2.0.1 tagged",
  tag: "v2.0.1"
});


master.commit("Our power users just found a major issue. Cherry pick.");
master.merge(release_200, {
  dotStrokeWidth: 10,
  message: "Release v2.0.2 tagged",
  tag: "v2.0.2"
});

master.commit("A good useful feature commit");

master.commit("Another good useful feature commit. We are on a roll here. We are creating a release branch");

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

master.commit("Regular dev work, commit");

