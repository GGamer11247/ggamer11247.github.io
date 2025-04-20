const rarities = [
    "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic",
    "Godlike", "Beyond Godlike", "Demi-God", "God", "Ultrapowered",
    "Maximum Overdrive", "Power Overload", "The Absolute Best"
];
const rarityColors = [
    "#A0A0A0", "#4CAF50", "#2196F3", "#9C27B0", "#FF9800", "#F44336",
    "#E91E63", "#673AB7", "#3F51B5", "#00BCD4", "#009688",
    "#8BC34A", "#CDDC39", "#FFEB3B"
];
const rarityMultipliers = [1, 1.5, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
const newPetCostBase = 100;

let coins = 0;
let coinsPerSecond = 1;
let petCount = 1;
let currentRarityIndex = 0;
let upgradeCost = 10;
let newPetCost = newPetCostBase;

const coinsDisplay = document.getElementById('coins');
const cpsDisplay = document.getElementById('cps');
const petCountDisplay = document.getElementById('pet-count');
const petRarityDisplay = document.getElementById('pet-rarity');
const petBody = document.getElementById('pet-body');
const miningRateDisplay = document.getElementById('mining-rate');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const newPetCostDisplay = document.getElementById('new-pet-cost');
const mineButton = document.getElementById('mine-btn');
const upgradeRarityButton = document.getElementById('upgrade-rarity');
const buyNewPetButton = document.getElementById('buy-new-pet');

function updateDisplay() {
    coinsDisplay.textContent = Math.floor(coins);
    cpsDisplay.textContent = coinsPerSecond.toFixed(1);
    petCountDisplay.textContent = petCount;
    petRarityDisplay.textContent = rarities[currentRarityIndex];
    petRarityDisplay.style.color = rarityColors[currentRarityIndex];
    petBody.setAttribute('fill', rarityColors[currentRarityIndex]);
    miningRateDisplay.textContent = `${(coinsPerSecond / petCount).toFixed(1)} coin/s per pet`;
    upgradeCostDisplay.textContent = upgradeCost;
    newPetCostDisplay.textContent = newPetCost;
    
    upgradeRarityButton.disabled = coins < upgradeCost;
    buyNewPetButton.disabled = coins < newPetCost;
}

mineButton.addEventListener('click', () => {
    coins += coinsPerSecond / 10;
    updateDisplay();
    
    // Add click animation
    const pet = document.getElementById('pet-svg');
    pet.style.transform = 'scale(1.1)';
    setTimeout(() => {
        pet.style.transform = 'scale(1)';
    }, 100);
});

upgradeRarityButton.addEventListener('click', () => {
    if (currentRarityIndex < rarities.length - 1) {
        coins -= upgradeCost;
        currentRarityIndex++;
        coinsPerSecond = petCount * rarityMultipliers[currentRarityIndex];
        upgradeCost = Math.floor(upgradeCost * 3);
        updateDisplay();
    }
});

buyNewPetButton.addEventListener('click', () => {
    coins -= newPetCost;
    petCount++;
    coinsPerSecond = petCount * rarityMultipliers[currentRarityIndex];
    newPetCost = Math.floor(newPetCostBase * rarityMultipliers[currentRarityIndex] * Math.pow(1.1, petCount));
    updateDisplay();
});

// Game loop for passive income
setInterval(() => {
    coins += coinsPerSecond / 10;
    updateDisplay();
}, 100);

// Initialize
updateDisplay();