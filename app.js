const $calculator = document.querySelector('.container');
const $display = document.querySelector('.display');
const $buttons = document.querySelectorAll('.btn');


for (let i = 0; i < $buttons.length; i++) {
    $buttons[i].addEventListener('click', e => {
        const $button = e.target;
        const action = $button.dataset.action;
        const buttonValue = $button.textContent;
        const displayValue = $display.textContent;
        const previousKeyType = $display.dataset.previousKeyType;

        $buttons.forEach($button => $button.classList.remove('is-pressed'));

        if (!action) {
            $display.dataset.previousKeyType = 'number';
            if (displayValue === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                $display.textContent = buttonValue;
            } else {
                $display.textContent = displayValue + buttonValue;
            }
        } if (
            action === '+' ||
            action === '-' ||
            action === '*' ||
            action === '/'
        ) {
            const firstValue = $display.dataset.firstValue;
            const secondValue = displayValue;
            const operator = $display.dataset.operator;
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue);
                $display.textContent = calcValue;
                $display.dataset.firstValue = calcValue;
            } else {
                $display.dataset.firstValue = displayValue;
            }
            $button.classList.add('is-pressed');
            $display.dataset.previousKeyType = 'operator';
            $display.dataset.operator = action;

        } if (action === 'decimal') {
            $display.dataset.previousKeyType = 'decimal';
            if ($display.textContent.includes(".")) {
                return;
            }
            $display.textContent = displayValue + buttonValue;
        } if (action === 'percent') {
            //do something
        } if (action === 'pos-neg') {
            if ($display.dataset.previousKeyType === 'number') {
                $display.textContent = String(Number($display.textContent) * -1);
            }
        } if (action === 'clear') {
            if ($button.textContent === 'AC') {
                $display.dataset.firstValue = '';
                $display.dataset.operator = '';
                $display.dataset.secondValue = '';
                $display.dataset.newSecondValue = '';
            } else {
                $button.textContent = 'AC';
            }

            $display.textContent = '0';
            $display.dataset.previousKeyType = 'clear';
        } if (action !== 'clear') {
            const clearButton = document.querySelector('.clear')
            clearButton.textContent = 'C'
        } if (action === 'calculate') {

            //do something
            const firstValue = $display.dataset.firstValue;
            const secondValue = displayValue;
            const operator = $display.dataset.operator;
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayValue;
                    secondValue = $display.dataset.newSecondValue;
                }
                $display.textContent = calculate(firstValue, operator, secondValue);
            }
            $display.dataset.newSecondValue = secondValue;
            $display.dataset.previousKeyType = 'calculate';

        }
    })
}


function calculate(first, operator, second) {
    let result = eval(first + operator + second);
    if (result - Math.floor(result) > 0) {
        return result.toFixed(2);
    } else {
        return result;
    }
};
