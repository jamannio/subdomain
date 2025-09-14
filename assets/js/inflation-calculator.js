// Inflation Calculator
document.addEventListener('DOMContentLoaded', () => {
    const liquidityInput = document.getElementById('liquidity');
    const yearsInput = document.getElementById('years');
    const inflationInput = document.getElementById('inflation');
    const calculateBtn = document.getElementById('calculate-btn');
    const lossAmount = document.getElementById('loss-amount');
    const remainingAmount = document.getElementById('remaining-amount');

    // Format number with thousand separators
    function formatCurrency(amount) {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Calculate inflation loss
    function calculateInflationLoss(principal, years, inflationRate) {
        const realValue = principal * Math.pow((1 - inflationRate / 100), years);
        const loss = principal - realValue;
        return Math.max(0, loss);
    }

    // Handle calculation
    function performCalculation() {
        const liquidity = parseFloat(liquidityInput.value) || 0;
        const years = parseInt(yearsInput.value) || 0;
        const inflation = parseFloat(inflationInput.value) || 0;

        if (liquidity <= 0 || years <= 0 || inflation < 0) {
            lossAmount.textContent = 'XXX.XXX €';
            remainingAmount.textContent = 'XXX.XXX €';
            return;
        }

        const loss = calculateInflationLoss(liquidity, years, inflation);
        const remaining = liquidity - loss;
        
        lossAmount.textContent = formatCurrency(loss);
        remainingAmount.textContent = formatCurrency(remaining);
    }

    // Event listeners
    calculateBtn.addEventListener('click', performCalculation);

    // Optional: Calculate on Enter key press
    [liquidityInput, yearsInput, inflationInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performCalculation();
            }
        });
    });

    // Optional: Auto-calculate on input change (with debounce)
    let debounceTimer;
    [liquidityInput, yearsInput, inflationInput].forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(performCalculation, 500);
        });
    });
});