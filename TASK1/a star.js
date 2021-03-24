//
function Queue() {
    var a = [], b = 0;

    this.getLength = function () {
        return a.length - b
    };

    this.isEmpty = function () {
        return 0 == a.length
    };

    this.enqueue = function (b) {
        a.push(b);
        a.sort(function (a, b) {
            if (a.f > b.f) return 1;
            if (a.f < b.f) return -1;
            return 0;
        });
    };

    this.dequeue = function () {
        var i = a.shift();
        return i;
    };
};

function triple(F, X, Y) {
    this.f = F;
    this.x = X;
    this.y = Y;
}

//struct of cell
function CellDetails() {
    this.f;                                                     //f = g + h
    this.g;                                                     //returns cost from source
    this.h;                                                     //heuristic (manhattan distance)
    this.parent_i;                                              //x coords of parent cell
    this.parent_j;                                              //y coords of parent cell
}

//checks if cell not out of bounds
function isValid(x, y) {
    if (x >= 0 && x < n && y >= 0 && y < n) {
        return true;
    }

    else {
        return false;
    }
}

//checks if cell is destination cell
function isDestination(x, y, dest) {
    if (x == dest.x && y == dest.y) {
        return true;
    }

    else {
        return false;
    }
}

//returns manhattan distance
function calculateHValue(x, y, dest) {
    var Hvalue = Math.abs(x - dest.x) + Math.abs(y - dest.y);

    return Hvalue;
}

function aStar(grid, src, dest) {
    console.log("SUCCESSFULLY LOADED aSTAR");
    console.log(n);

    //adds isVisited matrix
    var isVisited = new Array(n);
    for (let i = 0; i < n; i++) {
        isVisited[i] = new Array(n);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            isVisited[i][j] = false;
        }
    }

    //matrix that holds all information of current cell
    var cellDetails = new Array(n);
    for (let i = 0; i < n; i++) {
        cellDetails[i] = new Array(n);
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            cellDetails[i][j] = new CellDetails();
        }
    }

    //initializes for source
    var i = src.x;
    var j = src.y;
    cellDetails[i][j].f = 0.0;
    cellDetails[i][j].g = 0.0;
    cellDetails[i][j].h = 0.0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;

    var openList = new Queue();                             //stores possible neighboors

    //adding starting position to queue
    var triplet = new triple(0.0, i, j);
    openList.enqueue(triplet);

    var foundDest = false;                                  //boolean to check if end point has been found

    //Searching for dest....
    while (!openList.isEmpty()) {
        var p = openList.dequeue();

        i = p.x;
        j = p.y;
        console.log("Visiting:")
        console.log("i = ", i);
        console.log("j = ", j);
        console.log("f = ", p.f, " g =", cellDetails[i][j].g, " h = ", cellDetails[i][j].h);
        isVisited[i][j] = true;
        drawRec(i, j, cellSide, "#70e67a");

        /////////////////////////////////////////
        //                                     //
        //generate all neighboors of cell[i][j]//
        //                                     //
        /////////////////////////////////////////

        var gNew, hNew, fNew;

        //1st neighboor (up)
        if (isValid(i - 1, j) == true) {
            //if end cell is same as current neighboor
            if (isDestination(i - 1, j, dest) == true) {
                //set parent of destination cell
                cellDetails[i - 1][j].parent_i = i;
                cellDetails[i - 1][j].parent_j = j;
                //MAKE HAPPY NOISES
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }

            //if neighboor not already visited and isn't an obstacle
            else if (isVisited[i - 1][j] == false && grid[i - 1][j] != 1) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateHValue(i - 1, j, dest);
                fNew = hNew + gNew;

                //checks if the cell isn't in the openList, and if it is, checks if it has best current value
                if (cellDetails[i - 1][j].f == undefined || cellDetails[i - 1][j].f > fNew) {
                    triplet = new triple(fNew, i - 1, j);
                    openList.enqueue(triplet);
                    console.log("has added (", triplet.x, ",", triplet.y, ") to be searched with f of", triplet.f);

                    //update details of cell
                    cellDetails[i - 1][j].f = fNew;
                    cellDetails[i - 1][j].g = gNew;
                    cellDetails[i - 1][j].h = hNew;
                    cellDetails[i - 1][j].parent_i = i;
                    cellDetails[i - 1][j].parent_j = j;
                }
            }

        }

        //2nd neighboor (down)
        if (isValid(i + 1, j) == true) {
            //if end cell is same as current neighboor
            if (isDestination(i + 1, j, dest) == true) {
                //set parent of destination cell
                cellDetails[i + 1][j].parent_i = i;
                cellDetails[i + 1][j].parent_j = j;
                //MAKE HAPPY NOISES
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }

            //if neighboor not already visited and isn't an obstacle
            else if (isVisited[i + 1][j] == false && grid[i + 1][j] != 1) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateHValue(i + 1, j, dest);
                fNew = hNew + gNew;

                //checks if the cell isn't in the openList, and if it is, checks if it has best current value
                if (cellDetails[i + 1][j].f == undefined || cellDetails[i + 1][j].f > fNew) {
                    triplet = new triple(fNew, i + 1, j);
                    openList.enqueue(triplet);
                    console.log("has added (", triplet.x, ",", triplet.y, ") to be searched with f of", triplet.f);

                    //update details of cell
                    cellDetails[i + 1][j].f = fNew;
                    cellDetails[i + 1][j].g = gNew;
                    cellDetails[i + 1][j].h = hNew;
                    cellDetails[i + 1][j].parent_i = i;
                    cellDetails[i + 1][j].parent_j = j;
                }
            }

        }

        //3rd neighboor (right)
        if (isValid(i, j + 1) == true) {
            //if end cell is same as current neighboor
            if (isDestination(i, j + 1, dest) == true) {
                //set parent of destination cell
                cellDetails[i][j + 1].parent_i = i;
                cellDetails[i][j + 1].parent_j = j;
                //MAKE HAPPY NOISES
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }

            //if neighboor not already visited and isn't an obstacle
            else if (isVisited[i][j + 1] == false && grid[i][j + 1] != 1) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateHValue(i, j + 1, dest);
                fNew = hNew + gNew;

                //checks if the cell isn't in the openList, and if it is, checks if it has best current value
                if (cellDetails[i][j + 1].f == undefined || cellDetails[i][j + 1].f > fNew) {
                    triplet = new triple(fNew, i, j + 1);
                    openList.enqueue(triplet);
                    console.log("has added (", triplet.x, ",", triplet.y, ") to be searched with f of", triplet.f);

                    //update details of cell
                    cellDetails[i][j + 1].f = fNew;
                    cellDetails[i][j + 1].g = gNew;
                    cellDetails[i][j + 1].h = hNew;
                    cellDetails[i][j + 1].parent_i = i;
                    cellDetails[i][j + 1].parent_j = j;
                }
            }

        }

        //4th neighboor (left)
        if (isValid(i, j - 1) == true) {
            //if end cell is same as current neighboor
            if (isDestination(i, j - 1, dest) == true) {
                //set parent of destination cell
                cellDetails[i][j - 1].parent_i = i;
                cellDetails[i][j - 1].parent_j = j;
                //MAKE HAPPY NOISES
                tracePath(cellDetails, dest);
                foundDest = true;
                return;
            }

            //if neighboor not already visited and isn't an obstacle
            else if (isVisited[i][j - 1] == false && grid[i][j - 1] != 1) {
                gNew = cellDetails[i][j].g + 1;
                hNew = calculateHValue(i, j - 1, dest);
                fNew = hNew + gNew;

                //checks if the cell isn't in the openList, and if it is, checks if it has best current value
                if (cellDetails[i][j - 1].f == undefined || cellDetails[i][j - 1].f > fNew) {
                    triplet = new triple(fNew, i, j - 1);
                    openList.enqueue(triplet);
                    console.log("has added (", triplet.x, ",", triplet.y, ") to be searched with f of", triplet.f);

                    //update details of cell
                    cellDetails[i][j - 1].f = fNew;
                    cellDetails[i][j - 1].g = gNew;
                    cellDetails[i][j - 1].h = hNew;
                    cellDetails[i][j - 1].parent_i = i;
                    cellDetails[i][j - 1].parent_j = j;
                }
            }
        }
    }

    //when no path has been found
    if (foundDest == false) {
        window.alert("NO PATH FOUND")
    }
    return;

}