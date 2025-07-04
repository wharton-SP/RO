import React from 'react';

const GraphEdgesTable = ({ data }) => {
    if (!data) {
        return <div className="p-4 text-red-500">Aucune donnée fournie.</div>;
    }

    const final_flow = data.final.final_flow;
    const satured = data.final.final_satured;
    const blocked = data.final.blocked_edges;
    const flow = data.final.max_flow;

    const isSatured = (from, to) => satured.some(edge => edge[0] === from && edge[1] === to);
    const isBlocked = (from, to) => blocked.some(edge => edge[0] === from && edge[1] === to);

    return (
        <div className="">
            <h2 className="text-xl font-bold">Détails</h2>
            <span>Flot : {flow}</span>
            <table className="min-w-full border border-gray-700 rounded-2xl">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="border border-gray-600 p-2">Arc</th>
                        <th className="border border-gray-600 p-2">Flot</th>
                        <th className="border border-gray-600 p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {final_flow.map(([from, to, flow], idx) => {
                        const status = isSatured(from, to) ? 'S' : isBlocked(from, to) ? 'B' : '';
                        return (
                            <tr key={idx} className="border border-gray-700 hover:backdrop-contrast-75 transition-all">
                                <td className="border border-gray-600 p-2 text-center">{from}{to}</td>
                                <td className="border border-gray-600 p-2 text-center">{flow}</td>
                                <td
                                    className={`border border-gray-600 p-2 text-center ${status === 'S' ? 'text-red-400' : status === 'B' ? 'text-blue-700' : ''
                                        }`}
                                >
                                    {status}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default GraphEdgesTable;
