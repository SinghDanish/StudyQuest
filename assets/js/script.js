// DOM Elements
const voiceCommandBtn = document.querySelector('.voice-command');
const voiceDemoBtn = document.querySelector('.voice-demo');
const musicDemoBtn = document.querySelector('.music-demo');
const startSessionBtn = document.querySelector('.btn-small');
const viewSampleBtn = document.querySelectorAll('.btn-small')[2];
const featureCards = document.querySelectorAll('.feature-card');

// Voice Command Simulation
function simulateVoiceCommand() {
    const voiceModal = document.createElement('div');
    voiceModal.className = 'voice-modal';
    voiceModal.innerHTML = `
        <div class="voice-modal-content">
            <div class="voice-listening">
                <i class="fas fa-microphone"></i>
                <p>Listening... Say something like "Add assignment due Friday"</p>
            </div>
            <button class="close-voice-modal">Close</button>
        </div>
    `;
    document.body.appendChild(voiceModal);
    
    // Close modal
    document.querySelector('.close-voice-modal').addEventListener('click', () => {
        voiceModal.remove();
    });
    
    // Simulate response after 3 seconds
    setTimeout(() => {
        document.querySelector('.voice-listening').innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Added "Math homework" to your planner for Friday</p>
        `;
    }, 3000);
}

// Music Player Demo
function playDemoMusic() {
    const musicPlayer = document.createElement('div');
    musicPlayer.className = 'music-player';
    musicPlayer.innerHTML = `
        <div class="music-player-content">
            <h4>Focus Playlist</h4>
            <p>Now playing: Deep Concentration Mix</p>
            <div class="player-controls">
                <button class="player-btn"><i class="fas fa-step-backward"></i></button>
                <button class="player-btn pause-btn"><i class="fas fa-pause"></i></button>
                <button class="player-btn"><i class="fas fa-step-forward"></i></button>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <button class="close-music-player">Close Player</button>
        </div>
    `;
    document.body.appendChild(musicPlayer);
    
    // Player functionality
    const pauseBtn = document.querySelector('.pause-btn');
    const progress = document.querySelector('.progress');
    let isPlaying = true;
    let progressWidth = 0;
    
    const progressInterval = setInterval(() => {
        if (isPlaying) {
            progressWidth += 1;
            progress.style.width = `${progressWidth}%`;
            
            if (progressWidth >= 100) {
                clearInterval(progressInterval);
            }
        }
    }, 300);
    
    pauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        pauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });
    
    document.querySelector('.close-music-player').addEventListener('click', () => {
        clearInterval(progressInterval);
        musicPlayer.remove();
    });
}

// Study Session Timer
function startStudySession() {
    const sessionModal = document.createElement('div');
    sessionModal.className = 'session-modal';
    sessionModal.innerHTML = `
        <div class="session-modal-content">
            <h4>Focus Session</h4>
            <div class="timer-display">25:00</div>
            <div class="session-actions">
                <button class="session-btn start-btn">Start</button>
                <button class="session-btn invite-btn">Invite Friends</button>
            </div>
            <div class="friends-online">
                <p>3 friends available to study with</p>
                <div class="friend-avatars">
                    <div class="avatar">A</div>
                    <div class="avatar">B</div>
                    <div class="avatar">C</div>
                </div>
            </div>
            <button class="close-session-modal">Close</button>
        </div>
    `;
    document.body.appendChild(sessionModal);
    
    // Timer functionality
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerInterval;
    const timerDisplay = document.querySelector('.timer-display');
    
    document.querySelector('.start-btn').addEventListener('click', function() {
        if (this.textContent === 'Start') {
            this.textContent = 'Pause';
            timerInterval = setInterval(updateTimer, 1000);
        } else {
            this.textContent = 'Start';
            clearInterval(timerInterval);
        }
    });
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            document.querySelector('.start-btn').textContent = 'Start';
            // Show completion animation
            timerDisplay.classList.add('completed');
        } else {
            timeLeft--;
        }
    }
    
    document.querySelector('.close-session-modal').addEventListener('click', () => {
        clearInterval(timerInterval);
        sessionModal.remove();
    });
}

// Email Digest Sample
function showEmailSample() {
    const emailModal = document.createElement('div');
    emailModal.className = 'email-modal';
    emailModal.innerHTML = `
        <div class="email-modal-content">
            <div class="email-header">
                <h4>Your Daily Digest</h4>
                <p>Monday, November 6, 2023</p>
            </div>
            <div class="email-body">
                <div class="email-task">
                    <h5>Math 101</h5>
                    <p>Complete Chapter 5 Exercises (Due Friday)</p>
                </div>
                <div class="email-task">
                    <h5>History 210</h5>
                    <p>Read pages 120-150 (Due Wednesday)</p>
                </div>
                <div class="email-task">
                    <h5>Computer Science</h5>
                    <p>Project Milestone 1 (Due Thursday)</p>
                </div>
            </div>
            <button class="close-email-modal">Close</button>
        </div>
    `;
    document.body.appendChild(emailModal);
    
    document.querySelector('.close-email-modal').addEventListener('click', () => {
        emailModal.remove();
    });
}

// Feature Card Animations
function animateFeatureCards() {
    featureCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.querySelector('.feature-icon').style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.feature-icon').style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Voice command buttons
    voiceCommandBtn.addEventListener('click', simulateVoiceCommand);
    voiceDemoBtn.addEventListener('click', simulateVoiceCommand);
    
    // Music player
    musicDemoBtn.addEventListener('click', playDemoMusic);
    
    // Study session
    startSessionBtn.addEventListener('click', startStudySession);
    
    // Email digest
    viewSampleBtn.addEventListener('click', showEmailSample);
    
    // Animate feature cards on load
    setTimeout(animateFeatureCards, 500);
    
    // Add any additional initialization code here
});

// Utility Functions
function createModal(htmlContent) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = htmlContent;
    document.body.appendChild(modal);
    return modal;
}

// Add styles dynamically for modals
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .voice-modal, .music-player, .session-modal, .email-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .voice-modal-content, .music-player-content, 
    .session-modal-content, .email-modal-content {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
    }
    
    .voice-listening, .timer-display {
        font-size: 1.5rem;
        margin: 20px 0;
    }
    
    .voice-listening i, .timer-display {
        color: var(--primary-color);
        font-size: 2rem;
        margin-bottom: 10px;
    }
    
    .progress-bar {
        height: 6px;
        background-color: #e9ecef;
        border-radius: 3px;
        margin: 20px 0;
        overflow: hidden;
    }
    
    .progress {
        height: 100%;
        background-color: var(--primary-color);
        width: 0%;
    }
    
    .player-controls {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 15px 0;
    }
    
    .player-btn {
        background-color: var(--primary-color);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    .session-actions {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 20px 0;
    }
    
    .session-btn {
        padding: 10px 20px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
    }
    
    .start-btn {
        background-color: var(--success-color);
        color: white;
    }
    
    .invite-btn {
        background-color: var(--accent-color);
        color: white;
    }
    
    .friends-online {
        margin: 20px 0;
    }
    
    .friend-avatars {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
    }
    
    .avatar {
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    .email-task {
        padding: 15px;
        margin: 10px 0;
        background-color: #f8f9fa;
        border-radius: 5px;
        text-align: left;
    }
    
    .email-task h5 {
        color: var(--primary-color);
        margin-bottom: 5px;
    }
    
    button.close-voice-modal, button.close-music-player, 
    button.close-session-modal, button.close-email-modal {
        background-color: var(--gray-color);
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 20px;
        margin-top: 20px;
        cursor: pointer;
    }
    
    .completed {
        color: var(--success-color);
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(dynamicStyles);
