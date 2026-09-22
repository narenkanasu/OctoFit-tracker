import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
  const users = await User.find().populate('team').sort({ points: -1 });
  response.json(users);
});

apiRouter.get('/teams/', async (_request, response) => {
  const teams = await Team.find().populate('members').sort({ name: 1 });
  response.json(teams);
});

apiRouter.get('/activities/', async (_request, response) => {
  const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
  response.json(activities);
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user')
    .populate('team')
    .sort({ rank: 1 });
  response.json(leaderboard);
});

apiRouter.get('/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
  response.json(workouts);
});

export default apiRouter;
