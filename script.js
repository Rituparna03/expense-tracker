let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!desc || !amount) {
    alert("Fill all fields");
    return;
  }

  const expense = { desc, amount: +amount, category };
  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
}

function displayExpenses() {
  const list = document.getElementById("list");
  const total = document.getElementById("total");

  list.innerHTML = "";
  let sum = 0;

  expenses.forEach((e, index) => {
    sum += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `${e.desc} - ₹${e.amount} (${e.category}) 
    <button onclick="deleteExpense(${index})">❌</button>`;

    list.appendChild(li);
  });

  total.innerText = sum;
  updateChart();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

function updateChart() {
  const categories = {};

  expenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories)
    }]
  };

  const ctx = document.getElementById("chart");

  if (window.myChart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "pie",
    data: data
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

displayExpenses();