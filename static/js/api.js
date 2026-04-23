/**
 * SKILLUP — Frontend API Client
 * Central module for all backend API calls.
 * Stores JWT in localStorage and attaches it to every authenticated request.
 */

const API_BASE = 'http://localhost:5000/api';

// ── Token helpers ──────────────────────────────────────────────
function getToken() {
  return localStorage.getItem('skillup_token');
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('skillup_user')); }
  catch { return null; }
}

function setSession(token, user) {
  localStorage.setItem('skillup_token', token);
  localStorage.setItem('skillup_user', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('skillup_token');
  localStorage.removeItem('skillup_user');
}

function isLoggedIn() {
  return !!getToken();
}

// ── Auth guard: call on protected pages ───────────────────────
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ── Base fetch wrapper ─────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}

// ── Auth ───────────────────────────────────────────────────────
async function apiLogin(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (data.success) setSession(data.token, data.user);
  return data;
}

async function apiRegister({ name, email, password, college }) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, college })
  });
  if (data.success) setSession(data.token, data.user);
  return data;
}

async function apiGetMe() {
  return apiFetch('/auth/me');
}

async function apiUpdateProfile(updates) {
  return apiFetch('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });
}

// ── Levels ─────────────────────────────────────────────────────
async function apiGetLevels() {
  return apiFetch('/levels');
}

async function apiGetLevel(number) {
  return apiFetch(`/levels/${number}`);
}

// ── Progress ───────────────────────────────────────────────────
async function apiGetProgress() {
  return apiFetch('/progress/me');
}

async function apiGetLeaderboard() {
  return apiFetch('/progress/leaderboard');
}

async function apiGetMentors() {
  return apiFetch('/progress/mentors');
}

async function apiMarkTask(levelNumber, taskIndex, completed) {
  return apiFetch('/progress/task', {
    method: 'PATCH',
    body: JSON.stringify({ levelNumber, taskIndex, completed })
  });
}

async function apiSubmitCode(levelNumber, language, code) {
  return apiFetch('/progress/submit-code', {
    method: 'POST',
    body: JSON.stringify({ levelNumber, language, code })
  });
}

// ── Quiz ───────────────────────────────────────────────────────
async function apiSubmitQuiz(levelNumber, answers, timeTaken) {
  return apiFetch('/quiz/submit', {
    method: 'POST',
    body: JSON.stringify({ levelNumber, answers, timeTaken })
  });
}

async function apiGetQuizHistory() {
  return apiFetch('/quiz/history');
}

// ── Health check ───────────────────────────────────────────────
async function apiHealthCheck() {
  return apiFetch('/health');
}

// ── Update navbar dynamically ──────────────────────────────────
function updateNavbar() {
  const user = getUser();
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  if (user && isLoggedIn()) {
    const initial = (user.name || 'U').charAt(0).toUpperCase();
    navActions.innerHTML = `
      <div class="nav-xp">⭐ ${(user.xp || 0).toLocaleString()} XP</div>
      ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-outline btn-sm" style="margin-right:10px;">Admin</a>' : ''}
      <a href="profile.html" class="nav-avatar" title="${user.name}" id="navAvatar">${initial}</a>
      <button onclick="handleLogout()" class="btn btn-outline" style="padding:8px 16px;font-size:0.85rem;">Logout</button>
    `;
  } else {
    navActions.innerHTML = `
      <a href="login.html" class="btn btn-outline">Login</a>
      <a href="signup.html" class="btn btn-gold">Join Free</a>
    `;
  }
}

function handleLogout() {
  clearSession();
  window.location.href = 'login.html';
}

// ── Expose globally ────────────────────────────────────────────
window.SkillupAPI = {
  getToken, getUser, setSession, clearSession, isLoggedIn, requireAuth, apiFetch,
  login: apiLogin, register: apiRegister, getMe: apiGetMe, updateProfile: apiUpdateProfile,
  getLevels: apiGetLevels, getLevel: apiGetLevel,
  getProgress: apiGetProgress, getLeaderboard: apiGetLeaderboard, getMentors: apiGetMentors,
  markTask: apiMarkTask, submitCode: apiSubmitCode,
  submitQuiz: apiSubmitQuiz, getQuizHistory: apiGetQuizHistory,
  healthCheck: apiHealthCheck,
  updateNavbar, handleLogout
};

// Auto-update navbar on every page load
document.addEventListener('DOMContentLoaded', updateNavbar);
