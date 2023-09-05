document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = button.textContent;
            
            if (buttonText === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                } catch (error) {
                    currentInput = 'Error';
                }
            } else if (buttonText === 'C') {
                currentInput = '';
            } else if (buttonText === '\u2190') {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput += buttonText;
            }

            display.value = currentInput;
        });
    });
});
