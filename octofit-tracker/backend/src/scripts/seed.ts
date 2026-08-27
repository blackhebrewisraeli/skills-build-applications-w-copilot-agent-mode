import { connectDatabase, disconnectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const teams = await TeamModel.insertMany([
      { name: 'Aurora', motto: 'Rise early, shine bright', color: 'teal', points: 1840, memberCount: 3 },
      { name: 'Summit', motto: 'Climb higher together', color: 'orange', points: 1710, memberCount: 2 },
      { name: 'Pulse', motto: 'Move with purpose', color: 'blue', points: 1595, memberCount: 2 },
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Ava Johnson',
        email: 'ava.johnson@octofit.local',
        gradeLevel: '10',
        role: 'captain',
        points: 640,
        streakDays: 12,
        teamId: teams[0]._id,
      },
      {
        name: 'Marcus Reed',
        email: 'marcus.reed@octofit.local',
        gradeLevel: '11',
        role: 'member',
        points: 590,
        streakDays: 9,
        teamId: teams[1]._id,
      },
      {
        name: 'Nia Patel',
        email: 'nia.patel@octofit.local',
        gradeLevel: '9',
        role: 'member',
        points: 610,
        streakDays: 14,
        teamId: teams[2]._id,
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.local',
        gradeLevel: '12',
        role: 'member',
        points: 555,
        streakDays: 7,
        teamId: teams[0]._id,
      },
      {
        name: 'Luna Garcia',
        email: 'luna.garcia@octofit.local',
        gradeLevel: '10',
        role: 'member',
        points: 535,
        streakDays: 8,
        teamId: teams[1]._id,
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.local',
        gradeLevel: '11',
        role: 'member',
        points: 520,
        streakDays: 6,
        teamId: teams[2]._id,
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 320,
        intensity: 'high',
        loggedAt: new Date('2026-08-24T07:15:00.000Z'),
        notes: 'Morning track session with interval sprints',
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        type: 'Strength Training',
        durationMinutes: 42,
        caloriesBurned: 290,
        intensity: 'medium',
        loggedAt: new Date('2026-08-24T16:20:00.000Z'),
        notes: 'Upper-body circuit with resistance bands',
      },
      {
        userId: users[2]._id,
        teamId: teams[2]._id,
        type: 'Walking',
        durationMinutes: 48,
        caloriesBurned: 210,
        intensity: 'low',
        loggedAt: new Date('2026-08-25T18:10:00.000Z'),
        notes: 'Brisk evening walk after homework',
      },
      {
        userId: users[3]._id,
        teamId: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 30,
        caloriesBurned: 260,
        intensity: 'medium',
        loggedAt: new Date('2026-08-26T07:45:00.000Z'),
        notes: 'Commute ride plus hill repeats',
      },
    ]);

    await LeaderboardModel.insertMany([
      { rank: 1, userId: users[0]._id, teamId: teams[0]._id, points: 640, wins: 8, trend: 'up' },
      { rank: 2, userId: users[2]._id, teamId: teams[2]._id, points: 610, wins: 7, trend: 'up' },
      { rank: 3, userId: users[1]._id, teamId: teams[1]._id, points: 590, wins: 6, trend: 'steady' },
      { rank: 4, userId: users[3]._id, teamId: teams[0]._id, points: 555, wins: 5, trend: 'up' },
      { rank: 5, userId: users[4]._id, teamId: teams[1]._id, points: 535, wins: 4, trend: 'steady' },
      { rank: 6, userId: users[5]._id, teamId: teams[2]._id, points: 520, wins: 4, trend: 'down' },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Cardio Burst Ladder',
        category: 'cardio',
        durationMinutes: 20,
        difficulty: 'medium',
        focus: 'endurance',
        description: 'Short intervals that alternate fast movement and recovery.',
        pointsAwarded: 120,
      },
      {
        name: 'Core Stability Flow',
        category: 'strength',
        durationMinutes: 25,
        difficulty: 'easy',
        focus: 'core',
        description: 'Low-impact core work for balance and posture.',
        pointsAwarded: 95,
      },
      {
        name: 'Team Tempo Builder',
        category: 'team',
        durationMinutes: 30,
        difficulty: 'medium',
        focus: 'coordination',
        description: 'Partner drills that reward pacing and communication.',
        pointsAwarded: 140,
      },
      {
        name: 'Recovery Mobility Circuit',
        category: 'recovery',
        durationMinutes: 15,
        difficulty: 'easy',
        focus: 'mobility',
        description: 'Stretch-based cooldown focused on flexibility and recovery.',
        pointsAwarded: 70,
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

seedDatabase();
