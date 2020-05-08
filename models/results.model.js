const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    winner: {
      type: {
        user_id: {
          type: String,
          required: true,
        },
        user_name: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    losers: {
      type: [
        {
          user_id: {
            type: String,
            required: true,
          },
          user_name: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model('results', resultSchema);

const addResult = async ({ room, winner, losers }) => {
  const createResult = new Result({
    room,
    winner,
    losers,
  });
  const newResult = await createResult.save();
  return {
    result_id: newResult._id,
    room: newResult.room,
    winner: newResult.winner,
    losers: newResult.losers,
  };
};

const fetchResults = async ({ user_id }) => {
  const results = await Result.find({});
  const wins = results.filter((result) => result.winner.user_id === user_id);
  const losses = results.filter((result) => {
    return result.losers.some((loser) => loser.user_id === user_id);
  });
  return {
    wins: wins,
    losses: losses,
    win_count: wins.length,
    loss_count: losses.length,
    game_count: wins.length + losses.length,
  };
};

module.exports = { addResult, fetchResults, Result };
