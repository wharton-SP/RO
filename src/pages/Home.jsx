import React from 'react';
import Graph from '../components/Graph';
import GraphBuilder from '../components/GraphBuilder';

const Home = () => {
    const handleSaveGraph = (graphData) => {
        console.log('Graph data to save:', graphData);
        // Ici vous pouvez ajouter l'appel à votre API
        // Exemple : 
        // axios.post('/api/graph', graphData)
        //   .then(response => console.log('Saved!', response))
        //   .catch(error => console.error('Error saving:', error));
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100vh',
            overflow: 'hidden'
        }}>
            {/* Panneau d'édition */}
            <div style={{
                width: '500px',
                height: '100%',
                borderRight: '2px solid #ddd',
                backgroundColor: '#f8f9fa'
            }}>
                <GraphBuilder
                    onSave={handleSaveGraph}
                    style={{ height: '100%' }}
                />
            </div>

            {/* Panneau de visualisation */}
            <div style={{
                flex: 1,
                height: '100%',
                position: 'relative'
            }}>
                <Graph
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff'
                    }}
                />
            </div>
        </div>
    );
};

export default Home;