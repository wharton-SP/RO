import React, { useMemo } from 'react';

const GraphEdgesTable = ({ data }) => {
    if (!data) {
        return <div className="p-4 text-red-500">Aucune donnée fournie.</div>;
    }

    const residualGraphEvolution = data.residual_graph_evolution;

    if (!residualGraphEvolution || residualGraphEvolution.length === 0) {
        return <div className="p-4 text-yellow-500">Aucune évolution du graphe résiduel disponible.</div>;
    }

    // Collecter tous les arcs uniques avec leur représentation complète
    const allArcs = new Set();
    const arcsInfo = new Map(); // Pour stocker les informations originales

    residualGraphEvolution.forEach(step => {
        step.forEach(([from, to, capacity]) => {
            const arcKey = `${from}${to}`;
            allArcs.add(arcKey);
            
            // Stocker les informations de l'arc si elles n'existent pas déjà
            if (!arcsInfo.has(arcKey)) {
                arcsInfo.set(arcKey, { from, to });
            }
        });
    });

    // Convertir en tableau
    const uniqueArcs = Array.from(allArcs);

    // Trier les arcs selon l'ordre spécifique
    const sortedArcs = useMemo(() => {
        const arcsArray = [...uniqueArcs];

        // Séparer les arcs en trois catégories
        const alphaArcs = [];
        const omegaArcs = [];
        const otherArcs = [];

        arcsArray.forEach(arcKey => {
            const { from, to } = arcsInfo.get(arcKey);

            if (from === 'α') {
                alphaArcs.push(arcKey);
            } else if (to === 'ω') {
                omegaArcs.push(arcKey);
            } else {
                otherArcs.push(arcKey);
            }
        });

        // Trier chaque catégorie par ordre alphabétique
        alphaArcs.sort();
        otherArcs.sort();
        omegaArcs.sort();

        // Combiner dans l'ordre: alpha -> autres -> omega
        return [...alphaArcs, ...otherArcs, ...omegaArcs];
    }, [uniqueArcs]);

    // Trouver la capacité d'un arc à une étape donnée
    const findCapacity = (stepIndex, arcKey) => {
        const step = residualGraphEvolution[stepIndex];
        const foundEdge = step.find(
            ([from, to]) => `${from}${to}` === arcKey
        );
        return foundEdge ? foundEdge[2] : '-';
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 overflow-y-scroll">
            <div className="">
                <table className="border-collapse">
                    <tbody>
                        {sortedArcs.map((arcKey, rowIndex) => {
                            const { from, to } = arcsInfo.get(arcKey);
                            return (
                                <tr
                                    key={arcKey}
                                    className={`hover:bg-gray-700/50 transition-colors ${rowIndex % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/30'}`}
                                >
                                    <td className="border-r border-b border-gray-700 p-3 font-mono">
                                        {from}{to}
                                    </td>
                                    {residualGraphEvolution.map((_, stepIndex) => {
                                        const capacity = findCapacity(stepIndex, arcKey);
                                        return (
                                            <td
                                                key={`${arcKey}-${stepIndex}`}
                                                className={`border-b border-gray-700 p-3 text-center ${capacity > 0
                                                        ? 'text-green-400'
                                                        : capacity === 0
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-500'
                                                    }`}
                                            >
                                                {capacity}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GraphEdgesTable;