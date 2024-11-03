
        const balanceElement = document.getElementById('balance');
        const rewardElement = document.getElementById('reward');
        const timerElement = document.getElementById('timer');
        const tapButton = document.getElementById('tap-button');

        const rewardSound = document.getElementById('reward-sound');
        const backgroundMusic = document.getElementById('background-music');

        let balance = parseFloat(localStorage.getItem('balance')) || 0.000000;
        let rewardMin = 0.000001;
        let rewardMax = 0.000010;
        let isButtonDisabled = false; 
        let timeRemaining = 60; 
        let timerInterval; 

        function generateReward() {
            return Math.random() * (rewardMax - rewardMin) + rewardMin;
        }

        function updateBalance(reward) {
            balance += reward;
            balanceElement.textContent = balance.toFixed(6) + ' NCT';
            localStorage.setItem('balance', balance);
        }

        function displayReward(reward) {
            rewardElement.textContent = `+${reward.toFixed(6)} NCT`;
            rewardElement.classList.add('show');
            setTimeout(() => {
                rewardElement.classList.remove('show');
            }, 2000);
        }

        function handleTap() {
            if (!isButtonDisabled) {
                isButtonDisabled = true; 
                tapButton.disabled = true;
                const reward = generateReward();
                updateBalance(reward);
                displayReward(reward);
                rewardSound.play(); 
                setTimeout(() => {
                    isButtonDisabled = false; 
                    tapButton.disabled = false;
                }, 2000);
            }
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                timeRemaining--;
                timerElement.textContent = `Time remaining: ${timeRemaining} seconds`;
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    tapButton.disabled = true; 
                }
            }, 1000);
        }

        backgroundMusic.play(); 
        tapButton.addEventListener('click', handleTap);
        startTimer()
