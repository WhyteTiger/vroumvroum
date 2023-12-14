export class Coin{


    image = null;

    constructor(tileset, image){
        this.tileset = tilesetImg.src(tileset);
        this.image = image;
    }

    dessinPiece() {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvasCoin';
        const ctx = canvas.getContext('2d');

        const tileSize = 160;

        const tilesPerRow = 12;

        const tileX = (this.image % tilesPerRow) * tileSize;
        const tileY = Math.floor(this.image / tilesPerRow) * tileSize;

        canvas.width = tileSize;
        canvas.height = tileSize;

        ctx.drawImage(this.tileset, tileX, tileY, tileSize, tileSize, 0, 0, tileSize, tileSize);

        const tileImage = canvas.toDataURL('image/png');

        document.body.appendChild(new Image()).src = tileImage;
    };

}