module.exports = function check(str, bracketsConfig) {
    const check = str.split('');

    const open = new Map();
    const close = new Map();

    bracketsConfig.forEach(
        (e) => {
            open.set(e[0], e[1]);
            close.set(e[1], e[0]);
        }
    );

    const queue = [];

    for(let i = 0; i < check.length; ++i) {
        if (open.has(check[i]) && close.has(check[i]) && queue.length > 0) {
            const last = queue[queue.length - 1];
            if (last === check[i]) {
                queue.pop();
            } else {
                queue.push(check[i]);
            }
        } else if (open.has(check[i])) {
            queue.push(check[i]);
        } else if (close.has(check[i])) {
            const last = queue.pop();
            if (last !== close.get(check[i])) {
                return false;
            }
        } else {
            return false;
        }
    }

    return queue.length === 0;
}
