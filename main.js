let data;
let expenditureArray = [];
let percentArray = [];
let colorArray = [];

function drawChart() {
  data = document.getElementById("json-data").value;
  percentArray = createPercentArray();
  colorArray = createRandomColorArray();
  populateArray(data);
  drawPie();
}

function populateArray(jsonData) {
  let expenseArray = JSON.parse(jsonData);
  for (i = 0; i < expenseArray.expenditures.length; i++) {
    let expense = expenseArray.expenditures[i];
    expenditureArray[i] = expense;
  }
}

function createPercentArray() {
  let perArr = [];
  for (i = 0; i < expenditureArray.length; i++) {
    perArr[i] = expenditureArray[i].percent * 0.02;
  }

  return perArr;
}

function createRandomColorArray() {
  let randColorArr = [];
  for (i = 0; i < expenditureArray.length; i++) {
    randColorArr[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return randColorArr;
}

function drawPie() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let startAngle = 0;
  let endAngle = 0;

  for (i = 0; i < percentArray.length; i++) {
    startAngle = endAngle;
    endAngle = endAngle + percentArray[i] * Math.PI;
    drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]);
  }
}

function drawSlice(
  ctx,
  sliceCneterX,
  sliceCenterY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(sliceCneterX, sliceCenterY);
  ctx.arc(sliceCneterX, sliceCenterY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}
