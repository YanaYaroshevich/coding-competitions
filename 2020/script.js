const fs = require('fs');

const files = ['2020/a_example.txt', '2020/b_read_on.txt', '2020/c_incunabula.txt', '2020/d_tough_choices.txt', '2020/e_so_many_books.txt', '2020/f_libraries_of_the_world.txt'];
const outputs = ['a.txt', 'b.txt', 'c.txt', 'd.txt', 'e.txt', 'f.txt'];

// const contents = fs.readFileSync('2020/a_example.txt', 'utf8');
// const contents = fs.readFileSync('2020/b_read_on.txt', 'utf8');
// const contents = fs.readFileSync('2020/c_incunabula.txt', 'utf8');
// const contents = fs.readFileSync('2020/d_tough_choices.txt', 'utf8');
// const contents = fs.readFileSync('2020/e_so_many_books.txt', 'utf8');
// const contents = fs.readFileSync('2020/f_libraries_of_the_world.txt', 'utf8');
files.forEach((file, index) => {
    const contents = fs.readFileSync(file, 'utf8');
    const lines = contents.split('\n');
    let [B, L, D] = lines[0].split(' ').map((el) => +el);
    lines.shift();

    const awards = lines[0].split(' ').map((el) => +el);
    lines.shift();

    const libraries = [];
    const booksFr = (new Array(B)).fill(0);

    for (let i = 0; i < L; i++) {
        const [N, T, M] = lines[0].split(' ').map((el) => +el);
        libraries.push({
            N,
            T,
            M,
            ind: i,
            books: lines[1].split(' ').map((el) => {booksFr[el]++; return +el;})
        });
        lines.shift();
        lines.shift();
    }

    for (let i = 0; i < L; i++) {
        libraries[i].books.sort((a, b) => (awards[b] - awards[a]) || (booksFr[a] - booksFr[b]));
    }

    let output = ``;
    let count = 0;

    do {
        const libMarks = [];

        libraries.forEach((lib) => {
            const booksToTakeCount = Math.max(lib.M * (D - lib.T), 0);
            let libAward = 0;

            const min = Math.min(booksToTakeCount, lib.books.length);
            for (let i = 0; i < min; i++) {
                libAward += awards[lib.books[i]];
            }

            libMarks[lib.ind] = {award: libAward / (lib.T), books: lib.books.slice(0, min)};
        });

        let max = 0;
        let maxInd = -1;

        for (let i = 0; i < libMarks.length; i++) {
            if (libMarks[i] && libMarks[i].award > max) {
                max = libMarks[i].award;
                maxInd = i;
            }
        }

        if (maxInd === -1) {
            break;
        }

        output = `${output}
${maxInd} ${libMarks[maxInd].books.length}
${libMarks[maxInd].books.join(' ')}`;
        count++;

        const coolLibInd = libraries.findIndex((lib) => lib.ind === maxInd);
        D -= libraries[coolLibInd].T;
        libraries.splice(coolLibInd, 1);

        const libMarksMap = libMarks[maxInd].books.reduce((prev, cur) => {
            prev[cur] = true;
            return prev;
        }, {});
        libraries.forEach((lib) => {
            for (let i = 0; i < lib.books.length; i++) {
                if (!libMarksMap[lib.books[i]]) {
                    continue;
                }
                lib.books.splice(i, 1);
                i--;
            }
        });

        console.log(D);
        console.log(libraries.length);

    } while(D > 0 && libraries.length);

    fs.writeFileSync(outputs[index], `${count}${output}`, 'utf8');
});


