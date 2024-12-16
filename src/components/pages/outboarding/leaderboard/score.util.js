export const getScoreList = (userScore, userScores) => {
  const result= [];

  const index = userScores.findIndex(
    item => (item.userId || item._id) === (userScore.userId || userScore._id)
  );

  if (index > -1 && index <= 4) {
    result.push(
      ...userScores.slice(0, 5).map((item, i) => ({
        ...item,
        active: i === index,
        rank: i + 1,
      }))
    );
  } else if (index > 4) {
    // get 4 items from userScores highest score
    result.push(
      ...userScores.slice(0, 4).map((item, i) => ({
        ...item,
        active: false,
        rank: i + 1,
      }))
    );

    result.push({
      ...userScore,
      active: true,
      rank: userScore?.['rank'],
    });
  } else {
    result.push(
      ...userScores.slice(0, 4).map((item, i) => ({
        ...item,
        active: false,
        rank: i + 1,
      }))
    );

    result.push({
      ...userScore,
      active: true,
      rank: userScore?.['rank'],
    });
  }

  return result;
}

export const getTeamScoreList = (teamScore, teamScores) => {

  if (!teamScore) {
    return teamScores.slice(0, 5)
  }

  const result= [];

  const index = teamScores.findIndex(
    item => (item.roomId || item._id) === (teamScore.roomId || teamScore._id)
  );

  if (index > -1 && index <= 4) {
    result.push(
      ...teamScores.slice(0, 5).map((item, i) => ({
        ...item,
        active: i === index,
      }))
    );
  } else if (index > 4) {
    // get 4 items from userScores highest score
    result.push(
      ...teamScores.slice(0, 4).map((item) => ({
        ...item,
        active: false,
      }))
    );

    result.push({
      ...teamScore,
      active: true,
      rank: teamScore?.['rank'],
    });
  } else {
    result.push(
      ...teamScores.slice(0, 4).map((item) => ({
        ...item,
        active: false,
      }))
    );

    result.push({
      ...teamScore,
      active: true,
      rank: teamScore?.['rank'],
    });
  }

  return result;
}

