// Leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: "Sarah M.",
    streak: 42,
    points: 1250,
  },
  {
    rank: 2,
    name: "Mike T.",
    streak: 38,
    points: 1180,
  },
  {
    rank: 3,
    name: "You",
    streak: 21,
    points: 890,
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Emma L.",
    streak: 19,
    points: 750,
  },
  {
    rank: 5,
    name: "James K.",
    streak: 15,
    points: 680,
  },
  {
    rank: 6,
    name: "Lisa P.",
    streak: 12,
    points: 590,
  },
];

// Get user data from localStorage
function getUserData() {
  const userName = localStorage.getItem("userName") || "You";
  const userPoints = localStorage.getItem("userPoints") || "890";
  const userStreak = localStorage.getItem("userStreak") || "21";

  return {
    name: userName,
    points: userPoints,
    streak: userStreak,
  };
}

// Initialize the page
function init() {
  console.log("Community page loaded");
  // Could update leaderboard with real user data here
  const userData = getUserData();
  console.log("Current user:", userData);
}

// Share workout function
function shareWorkout() {
  const userData = getUserData();
  const shareText = `🏋️ Just crushed another workout on HoloCoach!\n\n💪 ${userData.streak} day streak\n⭐ ${userData.points} points\n\nJoin me on HoloCoach 2.0!`;

  // Check if Web Share API is available
  if (navigator.share) {
    navigator
      .share({
        title: "HoloCoach Workout",
        text: shareText,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    // Fallback for browsers that don't support Web Share API
    const confirmed = confirm(
      `Share this message:\n\n${shareText}\n\nCopy to clipboard?`
    );

    if (confirmed) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert("Copied to clipboard! 📋"))
        .catch(() => alert("Please copy manually"));
    }
  }
}

// Navigation functions
function navigateTo(page) {
  if (page === "home") {
    window.location.href = "../home/home.html";
  } else if (page === "workout") {
    window.location.href = "../workout/workout.html";
  } else if (page === "community") {
    window.location.href = "../community/community.html";
  } else if (page === "profile") {
    window.location.href = "../profile/profile.html";
  }
}

// Load data when page loads
window.addEventListener("load", init);

// Refresh leaderboard periodically (optional)
function refreshLeaderboard() {
  console.log("Refreshing leaderboard...");
  // In a real app, this would fetch updated data from a server
}

// Optional: Auto-refresh every 30 seconds
// setInterval(refreshLeaderboard, 30000);
