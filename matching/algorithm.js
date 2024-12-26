const db = require('../config/db')
const { User } = require("../models/user");

const calculateCompatibility = (user1, user2) => {
  const commonHobbies = user1.hobbies.filter((hobby) =>
    user2.hobbies.includes(hobby)
  ).length;

  const commonInterests = user1.interests.filter((interest) =>
    user2.interests.includes(interest)
  ).length;

  let score = 0.5 * commonHobbies + 0.5 * commonInterests;

  if (user1.education_level === user2.education_level) {
    score += 0.1;
  }

  return score.toFixed(2);
};

const generateMatches = async (userId) => {
  let user = await User.find({ id: userId });
  if (!user.length) throw new Error("User not found");
  user = user[0];
  const potentialMatches = await User.find({
    id: { $ne: userId },
    gender: user.interested_in,
    interested_in: user.gender
  });

  const matches = potentialMatches
    .map((potentialUser) => ({
      user_id: potentialUser.id,
      name: potentialUser.name,
      compatibility_score: calculateCompatibility(user, potentialUser),
      common_hobbies: potentialUser.hobbies.filter((hobby) =>
        user.hobbies.includes(hobby)
      ),
      common_interests: potentialUser.interests.filter((interest) =>
        user.interests.includes(interest)
      )
    }))
    .sort((a, b) => b.compatibility_score - a.compatibility_score);

  return matches;
};

const getCompatibilityScore = async (userId1, userId2) => {
  const user1 = await User.find({ id: userId1 });
  const user2 = await User.find({ id: userId2 });
  if (!user1.length || !user2.length) throw new Error("User(s) not found");
  return {
    user1_id: userId1,
    user2_id: userId2,
    compatibility_score: calculateCompatibility(user1[0], user2[0])
  };
};

module.exports = { generateMatches, getCompatibilityScore };
