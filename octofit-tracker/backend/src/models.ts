import { model, Schema, Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    motto: { type: String, required: true },
    color: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    memberCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gradeLevel: { type: String, required: true },
    role: { type: String, required: true, default: 'student' },
    points: { type: Number, required: true, default: 0 },
    streakDays: { type: Number, required: true, default: 0 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    intensity: { type: String, required: true },
    loggedAt: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    wins: { type: Number, required: true },
    trend: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
    pointsAwarded: { type: Number, required: true },
  },
  { timestamps: true },
);

export const TeamModel = model('Team', teamSchema);
export const UserModel = model('User', userSchema);
export const ActivityModel = model('Activity', activitySchema);
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
export const WorkoutModel = model('Workout', workoutSchema);

export type TeamDocument = {
  _id: Types.ObjectId;
  name: string;
  motto: string;
  color: string;
  points: number;
  memberCount: number;
};

export type UserDocument = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  gradeLevel: string;
  role: string;
  points: number;
  streakDays: number;
  teamId: Types.ObjectId;
};

export type ActivityDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  teamId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  intensity: string;
  loggedAt: Date;
  notes: string;
};

export type LeaderboardDocument = {
  _id: Types.ObjectId;
  rank: number;
  userId: Types.ObjectId;
  teamId: Types.ObjectId;
  points: number;
  wins: number;
  trend: string;
};

export type WorkoutDocument = {
  _id: Types.ObjectId;
  name: string;
  category: string;
  durationMinutes: number;
  difficulty: string;
  focus: string;
  description: string;
  pointsAwarded: number;
};