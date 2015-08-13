var workaholic = Workaholic.create(2);
var calcs = [];
var value1 = 10;
var value2 = 5;

calcs.push(workaholic.execute(value1, value2, function(a, b) {
    var sum = a + b;
    finish('sum: ' + sum);
}));

calcs.push(workaholic.execute(value1, value2, function(a, b) {
    var difference = a - b;
    finish('difference: ' + difference);
}));

calcs.push(workaholic.execute(value1, value2, function(a, b) {
    var product = a * b;
    finish('product: ' + product);
}));

calcs.push(workaholic.execute(value1, value2, function(a, b) {
    var quotient = a / b;
    finish('quotient: ' + quotient);
}));

calcs.forEach(function(calc) {
    calc.done(function(result) {
        document.write(result + '<br>');
    });
});
