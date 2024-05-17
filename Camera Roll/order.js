document.addEventListener('DOMContentLoaded', () => {
  const dishesSelect = document.getElementById('dishes');
  const drinksSelect = document.getElementById('drinks');
  const dessertsSelect = document.getElementById('desserts');
  const quantityInput = document.getElementById('quantity');
  const totalAmount = document.getElementById('totalAmount');
  const paymentMethodRadios = document.getElementsByName('payment');
  const cardDetails = document.getElementById('card-details');
  const mpesaDetails = document.getElementById('mpesa-details');
  const confirmOrderButton = document.getElementById('confirmOrderButton');
  const clearOrderButton = document.getElementById('clearOrderButton');

  const calculateTotal = () => {
    let total = 0;
    const selectedDish = dishesSelect.options[dishesSelect.selectedIndex];
    const selectedDrink = drinksSelect.options[drinksSelect.selectedIndex];
    const selectedDessert = dessertsSelect.options[dessertsSelect.selectedIndex];
    const quantity = parseInt(quantityInput.value);

    if (selectedDish.value) total += parseFloat(selectedDish.dataset.price);
    if (selectedDrink.value) total += parseFloat(selectedDrink.dataset.price);
    if (selectedDessert.value) total += parseFloat(selectedDessert.dataset.price);

    total *= quantity;
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
  };

  dishesSelect.addEventListener('change', calculateTotal);
  drinksSelect.addEventListener('change', calculateTotal);
  dessertsSelect.addEventListener('change', calculateTotal);
  quantityInput.addEventListener('input', calculateTotal);

  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'credit-card') {
        cardDetails.style.display = 'block';
        mpesaDetails.style.display = 'none';
      } else if (radio.value === 'mpesa') {
        cardDetails.style.display = 'none';
        mpesaDetails.style.display = 'block';
      } else {
        cardDetails.style.display = 'none';
        mpesaDetails.style.display = 'none';
      }
    });
  });

  confirmOrderButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to place this order?')) {
      alert('Please wait for messages on your email to confirm your order. If you don’t receive any within five minutes, please contact us.');
      window.location.href = 'signin.html';
    }
  });

  clearOrderButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the order?')) {
      dishesSelect.value = '';
      drinksSelect.value = '';
      dessertsSelect.value = '';
      quantityInput.value = 1;
      totalAmount.textContent = 'Total: $0.00';
    }
  });
});
