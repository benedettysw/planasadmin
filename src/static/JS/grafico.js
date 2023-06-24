fetch('graficos')
  .then(response => response.json())
  .then(data => {
    const nombres = data.map(row => row.nombre_persona);
    const totales = data.map(row => row.total_planas);

    const chartData = {
      labels: nombres,
      datasets: [
        {
          label: 'Total de planas',
          data: totales,
          backgroundColor: [
            'rgba(255, 91, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('grafico').getContext('2d');
    new Chart(ctx, chartConfig);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
