import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiBaseUrl } from './config/runtime.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  const users = await UserModel.find().populate('teamId', 'name color').sort({ name: 1 }).lean();

  response.json({ apiBaseUrl, count: users.length, items: users });
});

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  const teams = await TeamModel.find().sort({ name: 1 }).lean();

  response.json({ apiBaseUrl, count: teams.length, items: teams });
});

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  const activities = await ActivityModel.find()
    .populate('userId', 'name email')
    .populate('teamId', 'name color')
    .sort({ loggedAt: -1 })
    .lean();

  response.json({ apiBaseUrl, count: activities.length, items: activities });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  const leaderboard = await LeaderboardModel.find()
    .populate('userId', 'name email')
    .populate('teamId', 'name color')
    .sort({ rank: 1 })
    .lean();

  response.json({ apiBaseUrl, count: leaderboard.length, items: leaderboard });
});

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  const workouts = await WorkoutModel.find().sort({ category: 1, name: 1 }).lean();

  response.json({ apiBaseUrl, count: workouts.length, items: workouts });
});

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exit(1);
});