type Color = "Black" | "White"
type Files = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
type Ranks = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Position {
    constructor(
        private files: Files,
        private ranks: Ranks
    ) { }

    distanceFrom(position: Position) {
        return {
            ranks: Math.abs(position.ranks - this.ranks),
            files: Math.abs(position.files.charCodeAt(0) - this.files.charCodeAt(0))
        }
    }
}

abstract class Piece {
    protected position: Position;

    constructor(
        private readonly color: Color,
        files: Files,
        ranks: Ranks
    ) {
        this.position = new Position(files, ranks)
    }

    moveTo(position: Position) {
        this.position
    }
    abstract canMoveTo(position: Position): boolean
}

class King extends Piece {
    canMoveTo(position: Position) {
        let distance = this.position.distanceFrom(position)
        return distance.ranks < 2 && distance.files < 2
    }
}
class Queen extends Piece { }
class Bishop extends Piece { }
class Knight extends Piece { }
class Rook extends Piece { }
class Pawn extends Piece { }

class Game {
    private static makePieces() {
        return {
            new King('Black', "E", 8),
        }
    }
}