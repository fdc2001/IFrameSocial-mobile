/*
var yourself = {
    fibonacci : function(n) {
        if (n === 0) {
            return 0;
        } else if (n === 1) {
            return 1;
        } else {
            return this.fibonacci(n - 1) +
                this.fibonacci(n - 2);
        }
    }
};*/

/*const yourself = {
    fibonacci: function(n)  {
        return (n === 0) ? 0 : (n === 1) ? 1 : (this.fibonacci(n - 1) + this.fibonacci(n - 2))
    }
};*/

const fibonacci = (n)  => {
    var a = 1, b = 0, temp;

    while (n >= 0){
        temp = a;
        a = a + b;
        b = temp;
        n--;
    }

    return b;
}

const yourself = {
    fibonacci: n=>fibonacci(n)
};
