import React, { useEffect, useMemo } from 'react';

const GraphEdgesTable = ({ data }) => {
    if (!data) {
        return <div className="p-4 text-red-500">Aucune donnée fournie.</div>;
    }

    const residualGraphEvolution = data.residual_graph_evolution;

    if (!residualGraphEvolution || residualGraphEvolution.length === 0) {
        return <div className="p-4 text-yellow-500">Aucune évolution du graphe résiduel disponible.</div>;
    }

    const allArcs = new Set();
    const arcsInfo = new Map();

    residualGraphEvolution.forEach(step => {
        step.forEach(([from, to, capacity]) => {
            const arcKey = `${from}${to}`;
            allArcs.add(arcKey);

            if (!arcsInfo.has(arcKey)) {
                arcsInfo.set(arcKey, { from, to });
            }
        });
    });

    const uniqueArcs = Array.from(allArcs);

    const sortedArcs = useMemo(() => {
        const arcsArray = [...uniqueArcs];

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

        alphaArcs.sort();
        otherArcs.sort();
        omegaArcs.sort();

        return [...alphaArcs, ...otherArcs, ...omegaArcs];
    }, [uniqueArcs]);

    const findCapacity = (stepIndex, arcKey) => {
        const step = residualGraphEvolution[stepIndex];
        const foundEdge = step.find(
            ([from, to]) => `${from}${to}` === arcKey
        );
        return foundEdge ? foundEdge[2] : '-';
    };

    useEffect(() => {
        console.log("Arc bloqué :", data.final.blocked_edges);
    }, [data]);

    return (
        <div className="h-screen w-screen p-4 overflow-y-scroll">
            <div className="w-full flex justify-center">
                <table className="border-collapse">
                    <tbody>
                        {sortedArcs.map((arcKey, rowIndex) => {
                            const { from, to } = arcsInfo.get(arcKey);
                            let firstZeroFound = false;
                            let fisrtBlockFound = false;

                            return (
                                <tr
                                    key={arcKey}
                                    className={`hover:bg-base-100 transition-colors ${rowIndex % 2 === 0 ? 'bg-base-200' : 'bg-base-300'}`}
                                >
                                    <td className="border-r border-b border-gray-700 p-3 font-mono">
                                        {from}{to}
                                    </td>
                                    {residualGraphEvolution.map((_, stepIndex) => {
                                        const capacity = findCapacity(stepIndex, arcKey);
                                        let displayValue = capacity;
                                        let textColorClass = 'text-gray-500';

                                        if (typeof capacity === 'number') {
                                            if (capacity > 0) {
                                                textColorClass = 'text-green-400';

                                                if (capacity === 1) {
                                                    displayValue = '1';
                                                }

                                            } else if (capacity === 0) {
                                                if (!firstZeroFound) {
                                                    textColorClass = 'text-yellow-400';
                                                    firstZeroFound = true;
                                                }
                                                else {
                                                    displayValue = 'S';
                                                    textColorClass = 'text-red-400';
                                                }
                                            }
                                        }

                                        return (
                                            <td
                                                key={`${arcKey}-${stepIndex}`}
                                                className={`border-b border-gray-700 p-3 text-center ${textColorClass}`}
                                            >
                                                {displayValue}
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