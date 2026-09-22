import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Trailblazers', color: '#1f883d', members: [] },
      { name: 'Mountain Movers', color: '#0969da', members: [] },
      { name: 'Power Pack', color: '#bf8700', members: [] },
    ]);

    const users = await User.insertMany([
      { name: 'Avery Johnson', email: 'avery.johnson@mergington.edu', grade: 9, points: 420, team: teams[0]._id },
      { name: 'Jordan Lee', email: 'jordan.lee@mergington.edu', grade: 10, points: 385, team: teams[0]._id },
      { name: 'Casey Morgan', email: 'casey.morgan@mergington.edu', grade: 11, points: 510, team: teams[1]._id },
      { name: 'Riley Smith', email: 'riley.smith@mergington.edu', grade: 12, points: 465, team: teams[1]._id },
      { name: 'Taylor Brown', email: 'taylor.brown@mergington.edu', grade: 10, points: 340, team: teams[2]._id },
      { name: 'Morgan Davis', email: 'morgan.davis@mergington.edu', grade: 9, points: 295, team: teams[2]._id },
    ]);

    await Team.bulkWrite(
      teams.map((team, index) => ({
        updateOne: {
          filter: { _id: team._id },
          update: { members: users.slice(index * 2, index * 2 + 2).map((user) => user._id) },
        },
      })),
    );

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, points: 85, completedAt: new Date('2026-09-20') },
      { user: users[1]._id, type: 'strength', durationMinutes: 40, points: 75, completedAt: new Date('2026-09-19') },
      { user: users[2]._id, type: 'running', durationMinutes: 28, distanceMiles: 2.8, points: 80, completedAt: new Date('2026-09-20') },
      { user: users[3]._id, type: 'walking', durationMinutes: 45, distanceMiles: 2.2, points: 60, completedAt: new Date('2026-09-18') },
      { user: users[4]._id, type: 'strength', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-17') },
      { user: users[5]._id, type: 'walking', durationMinutes: 38, distanceMiles: 1.9, points: 55, completedAt: new Date('2026-09-16') },
    ]);

    await Leaderboard.insertMany(
      [...users]
        .sort((firstUser, secondUser) => secondUser.points - firstUser.points)
        .map((user, index) => ({
          user: user._id,
          team: user.team,
          points: user.points,
          rank: index + 1,
        })),
    );

    await Workout.insertMany([
      { title: 'First Lap', type: 'running', difficulty: 'beginner', durationMinutes: 20, description: 'Alternate jogging and walking for a comfortable first run.' },
      { title: 'Steady Strides', type: 'running', difficulty: 'intermediate', durationMinutes: 35, description: 'Build endurance with a steady pace and a strong finish.' },
      { title: 'Campus Walk', type: 'walking', difficulty: 'beginner', durationMinutes: 30, description: 'Take a brisk walk around campus and track your distance.' },
      { title: 'Hill Climb', type: 'walking', difficulty: 'advanced', durationMinutes: 45, description: 'Challenge your legs with repeated uphill walking intervals.' },
      { title: 'Bodyweight Basics', type: 'strength', difficulty: 'beginner', durationMinutes: 25, description: 'Practice squats, lunges, push-ups, and planks with good form.' },
      { title: 'Power Circuit', type: 'strength', difficulty: 'advanced', durationMinutes: 40, description: 'Complete a full-body circuit with short recovery periods.' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
