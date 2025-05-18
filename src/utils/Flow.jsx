import sendRequest from "./sendRequest";

export default async function sendData(data) {

    console.log(data);
    
    // Fonction de tri : 'α' vient avant A-Z
    const orderValue = (char) => (char === 'α' ? '0' : char);

    // Trier les arêtes selon la source (from)
    data.edges.sort((a, b) => orderValue(a.from).localeCompare(orderValue(b.from)));

    // Formater les arêtes comme attendu par le backend
    const formattedEdges = data.edges.map((edge) => ({
        source: edge.from,
        target: edge.to,
        capacity: parseInt(edge.weight, 10),
    }));

    // Envoyer au backend
    const result = await sendRequest('calculate', 'POST', formattedEdges);

    console.log(result);
    
    return result;
}
