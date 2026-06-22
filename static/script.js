function analyze() {
    const device = document.getElementById('device').value;
    const hours = document.getElementById('hours').value;
  
    fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device: device, hours: hours })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        document.getElementById('energy').innerText = data.energy;
        document.getElementById('co2').innerText = data.co2;
        renderChart(data.energy, data.co2);
      }
    });
  }
  
  let chartInstance = null;
  
  function renderChart(energy, co2) {
    const ctx = document.getElementById('impactChart').getContext('2d');
  
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Energy (kWh)', 'Carbon Emission (g)'],
        datasets: [{
          label: 'Device Impact',
          data: [energy, co2],
          backgroundColor: ['#42a5f5', '#ef5350']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  