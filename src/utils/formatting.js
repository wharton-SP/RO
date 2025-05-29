function formatMarkedPath(data) {
    const nodeMap = new Map();
    const order = [];

    data.forEach((item) => {
        const [[source, target], sign] = item;

        if (!nodeMap.has(source)) {
            nodeMap.set(source, sign);
            order.push(source);
        }

        if (!nodeMap.has(target)) {
            nodeMap.set(target, sign);
            order.push(target);
        }
    });

    return order.map(node => ({
        id: node,
        sign: nodeMap.get(node)
    }));
}

export default formatMarkedPath;
