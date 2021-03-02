class Board {
    constructor(m, n, startPosition = './js/userCells.json') {
        this.m = m,
        this.n = n,
        this.startPosition = startPosition,
        this.interval,
        this.cells = [],

        this.renderBoard()
    }

    test() {
        alert(this.m);
        alert(this.n)
    }

    renderBoard() {
        let board = document.getElementById('board');
        for(let i = 1; i <= this.m; i++) {
            let tr = document.createElement('tr');
            board.append(tr);
            for(let j = 1; j <= this.n; j++) {
                let td = document.createElement('td');
                tr.append(td);
                this.cells.push({
                    x: j,
                    y: i,
                    status: 0
                })
            }
        }
    }

    createStartStatus() {
        this.cells.forEach((item) => item.status = Math.round(Math.random()));
        this.addColor;
        this.lifeCells()
    }

    addColor() {
        this.cells.forEach((item) => {
            if(item.status) {
                let td = document.querySelector(`tr:nth-child(${item.y}) td:nth-child(${item.x})`);
                td.classList.add('alive');
            } else {
                let td = document.querySelector(`tr:nth-child(${item.y}) td:nth-child(${item.x})`);
                td.classList.remove('alive');
            }
    })
    }

    updateStatus() {

        let newCells = [];

        for(let item of this.cells) {

            let newItem = {};

            Object.assign(newItem, item);
            
            newCells.push(newItem);

            let neighbors = [];

            neighbors.push(this.cells.find((it => (it.y == (item.y - 1)) && (it.x == (item.x - 1)))));

            neighbors.push(this.cells.find((it => (it.y == (item.y - 1)) && (it.x == item.x))));

            neighbors.push(this.cells.find((it => (it.y == (item.y - 1)) && (it.x == (item.x + 1)))));

            neighbors.push(this.cells.find((it => (it.y == item.y) && (it.x == (item.x - 1)))));

            neighbors.push(this.cells.find((it => (it.y == item.y) && (it.x == (item.x + 1)))));

            neighbors.push(this.cells.find((it => (it.y == (item.y + 1)) && (it.x == (item.x - 1)))));

            neighbors.push(this.cells.find((it => (it.y == (item.y + 1)) && (it.x == item.x))));

            neighbors.push(this.cells.find((it => (it.y == (item.y + 1)) && (it.x == (item.x + 1)))));

            let trueNeighbors = neighbors.filter(it => it != undefined);

            let sum = trueNeighbors.reduce((s, it) => s + it.status, 0);

            if((item.status == 1) && (sum < 2 || sum > 3)) {
                newCells[newCells.length - 1].status = 0;
            } else if (sum == 3){
                newCells[newCells.length - 1].status = 1;
            }
        };

        this.cells = newCells;
    }

    lifeCells() {
        if(this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.updateStatus();
            this.addColor();
        }, 1000)
    }

    getJson() {
        fetch(this.startPosition)
            .then(response => response.json())
            .then(data => this.getUserStartPosition(data))
    }

    getUserStartPosition(data) {
        this.cells = [...data];
        this.addColor();
        this.lifeCells();
    }
}

// let board = new Board(4, 4);