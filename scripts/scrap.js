
// Initialize an empty array to store the data
var data = [];

 // Select the table rows (skip the first row, which is the header)
var rows = $('table.results tr').slice(1);

// Iterate through each row
rows.each(function() {
  // Initialize an empty object to store the data for this row
  var rowData = {};

  // Find the cells in this row
  var cells = $(this).find('td');

  // Extract the description and add it to the object
  rowData.description = cells.eq(0).text();

  // Extract the median salary and add it to the object
  rowData.median_salary = cells.eq(3).text();

  // Extract the live job count and add it to the object
  rowData.live_jobs = cells.eq(6).text();

  // Add this row's data to the array
  data.push(rowData);
});

// Convert the array to a JSON object and log it
console.log(JSON.stringify(data));