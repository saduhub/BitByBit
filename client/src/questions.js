const questions = [
    { label: "Do you count calories 3 times?", name: "countCalories", options: ["true", "false", "N/A"] },
    { label: "Did you shower today?", name: "shower", options: ["true", "false", "N/A"] },
    { label: "Do you practice password change?", name: "pwDaily", options: ["true", "false", "N/A"] },
    { label: "Did you have a haircut today?", name: "haircut", options: ["true", "false", "N/A"] },
    { label: "Did you style your hair today?", name: "stylingHair", options: ["true", "false", "N/A"] }
];

// Add Pomodoro questions
const totalPomodoros = 15;
for (let i = 1; i <= totalPomodoros; i++) {
    questions.push({
        label: `Pomodoro ${i}`,
        name: `pomodoro${i}`,
        options: ["true", "false", "N/A"]
    });
}

export default questions;