import { ArrowDownUp, FileDown, FileJson, FileUp } from 'lucide-react'
import React from 'react'

const jsonData = {
    nodes: [
        { id: "α", x: 276, y: 232, special: true },
        { id: "ω", x: 842, y: 225, special: true },
        { id: "A", x: 466, y: 118 },
        { id: "B", x: 473, y: 333 },
        { id: "C", x: 657, y: 110 },
        { id: "D", x: 669, y: 330 }
    ],
    edges: [
        { from: "α", to: "A", weight: "1" },
        { from: "α", to: "B", weight: "2" },
        { from: "A", to: "C", weight: "2" },
        { from: "B", to: "D", weight: "4" },
        { from: "C", to: "ω", weight: "5" },
        { from: "D", to: "ω", weight: "6" }
    ]
};

const highlightJson = (line) => {
    return line
        .replace(/"([^"]+)":/g, '<span class="text-info">"$1"</span>:') // clés
        .replace(/: "([^"]+)"/g, ': <span class="text-success">"$1"</span>') // chaînes
        .replace(/: (\d+)/g, ': <span class="text-warning">$1</span>') // nombres
        .replace(/: (true|false)/g, ': <span class="text-error">$1</span>'); // booléens
};

const ImporExport = () => {

    const jsonLines = JSON.stringify(jsonData, null, 2).split('\n');

    return (
        <section id="import-export">

            <h2 className='flex items-center gap-3'><ArrowDownUp /> <span className='text-4xl font-bold'>Calcul du Flot Maximal.</span></h2>
            <div className='pt-2'>
                <p className='italic badge badge-soft badge-warning'>Assurez-vous que votre graph est prêt.</p>
            </div>
            <div>
                <p className='font-bold menu-title text-lg'>Il est possible d'exporte le graph ou d'en importer, pour faciliter l'usage.</p>
                <p className='px-5 pb-2'>
                    - Appyuer sur <button className="btn btn-sm btn-neutral"> <FileUp /> <div>Exporter</div></button> pour exporter.
                </p>
                <p className='px-5 pb-2'>
                    - et sur <button className="btn btn-sm btn-neutral"> <FileDown /> <div>Importer</div></button> pour importer.
                </p>
                <p>
                    Les graph exporté et importé sont de type <span className='badge badge-warning badge-dash'><FileJson size={15} /> JSON</span>
                </p>
            </div>
            <div className='menu-title text-md'>
            *    Voilà à quoi ressemblera le contenu du <span className='badge badge-warning badge-dash'><FileJson size={15} /> JSON</span> :
            </div>
            <div className='w-full flex justify-center'>
                <div className="mockup-code w-3/4 bg-gray-900 text-xs">
                    {jsonLines.map((line, index) => (
                        <pre key={index} data-prefix={index + 1}>
                            <code dangerouslySetInnerHTML={{ __html: highlightJson(line) }} />
                        </pre>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ImporExport