const formatMarkedPath = (path) => {
    if (!path) return 'Pas de chemin Marqué';

    const mark = [];

    console.log(path);

    path.forEach((p) => {
        console.log(p);

        for (let i = 0; i < p.length; i++) {
            const [from, to] = p[i][0];
            const sign = p[i][1];

            if (sign === "-") {
                mark.push({ e: from, s: sign });
                mark.push({ e: to, s: "+" });
            } else {
                mark.push({ e: from, s: sign });
                mark.push({ e: to, s: sign });
            }
        }
    });

    // Supprimer les doublons
    const uniqueMark = mark.filter(
        (item, index, self) =>
            item.e !== "" &&
            self.findIndex((m) => m.e === item.e && m.s === item.s) === index
    );

    console.log(uniqueMark);

    return uniqueMark;
};

export default formatMarkedPath;
