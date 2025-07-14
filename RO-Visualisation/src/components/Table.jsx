import React from 'react';

const GraphEdgesTable = ({ data }) => {
    if (!data) {
        return <div className="p-4 text-red-500">Aucune donnée fournie.</div>;
    }

    const residualGraphEvolution = data.residual_graph_evolution;

    return (
        <div className="h-screen w-screen p-10 overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Évolution complète du graphe résiduel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {residualGraphEvolution.map((step, stepIndex) => (
                    <div key={stepIndex} className="border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
                        <h3 className="font-semibold mb-2">Étape {stepIndex + 1}</h3>
                        <table className="min-w-full border border-gray-700 rounded-xl text-sm">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="border border-gray-600 p-1">Arc</th>
                                    <th className="border border-gray-600 p-1">Capacité résiduelle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {step.map(([from, to, capacity], idx) => (
                                    <tr key={idx} className="border border-gray-700 hover:bg-gray-800 transition">
                                        <td className="border border-gray-600 p-1 text-center">{from} → {to}</td>
                                        <td className="border border-gray-600 p-1 text-center">{capacity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GraphEdgesTable;