import sendRequest from "./sendRequest";

export default async function sendData(data) {

    const orderValue = (char) => (char === 'α' ? '0' : char);

    data.edges.sort((a, b) => orderValue(a.from).localeCompare(orderValue(b.from)));

    const formattedEdges = data.edges.map((edge) => ({
        source: edge.from,
        target: edge.to,
        capacity: parseInt(edge.weight, 10),
    }));

    const result = await sendRequest('calculate', 'POST', formattedEdges);
    
    return result;
}
