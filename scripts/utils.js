define("utils", ["pixelLayer", "shared"], (PixelLayer, shared) => {

  const gridWidth = Number(document.getElementById("width-input").value);
  const gridHeight = Number(document.getElementById("height-input").value);

  const getGridX = (x, canvas) => {
    const cellWidth = canvas.clientWidth / gridWidth;
    return Math.floor(x / cellWidth);
  }
  const getGridY = (y, canvas) => {
    const cellHeight = canvas.clientHeight / gridHeight;
    return Math.floor(y / cellHeight);
  }

  const getEventXY = (e, canvas) => {
    const bounds = canvas.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    let gridX = getGridX(x, canvas);
    let gridY = getGridY(y, canvas);
    return [gridX, gridY];
  }

  const calculateCRC = (byteArray) => {
    const crcTable = new Uint32Array(256);
    let crc = 0 ^ -1;

    // Generate CRC table
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[i] = c;
    }

    // Calculate CRC
    for (let i = 0; i < byteArray.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ byteArray[i]) & 0xFF];
    }

    // Bitwise NOT
    crc = crc ^ -1;

    // Ensure positive integer
    crc >>>= 0;

    // Convert CRC to array of bytes (big-endian)
    const crcBytes = [
      (crc >>> 24) & 0xFF,
      (crc >>> 16) & 0xFF,
      (crc >>> 8) & 0xFF,
      crc & 0xFF
    ];

    return crcBytes;
  }
  const numberToBytes = (number, byteCount) => {
    const byteArray = [];
    for (let i = byteCount - 1; i >= 0; i--) {
      const byte = (number >> (i * 8)) & 0xFF;
      byteArray.push(byte);
    }
    return byteArray;
  }
  const getPngBlob = () => {
    console.log("TODO: there is an issue with filtering or compression, fix it :)");
    const len = gridWidth * gridHeight;
    const imgDataChunkData = Array(len * 4);
    //add up all colors on each pixel
    shared.layers.forEach(layer => {
      for (let i = 0; i < len; ++i) {
        //get individual bytes from css hex color
        const hexValue = layer.cells[i].value.slice(1);
        const bytes = [];
        for (let j = 0; j < hexValue.length; j += 2) {
          bytes.push(parseInt(hexValue.substr(j, 2)));
        }
        //add bytes to data
        for (let j = 0; j < bytes.length; ++j) {
          imgDataChunkData[i * 4 + j] = Math.min(imgDataChunkData[i * 4 + j] + bytes[j], 255);
        }
      }
    });

    // defining PNG specific chunks
    const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
    const imgHeaderChunkLength = numberToBytes(13, 4);
    const imgHeaderChunkType = "IHDR".split("").map(x => x.charCodeAt());
    const imgHeaderChunkData = [
      numberToBytes(gridWidth, 4),
      numberToBytes(gridHeight, 4),
      [8, 6, 0, 0, 0]
    ].flat(Infinity);
    const imgHeaderChunkCrc = calculateCRC([
      imgHeaderChunkType,
      imgHeaderChunkData].flat(Infinity));
    const imageHeaderChunk = [
      imgHeaderChunkLength,
      imgHeaderChunkType,
      imgHeaderChunkData,
      imgHeaderChunkCrc
    ].flat(Infinity);

    const imgDataChunkLenght = numberToBytes(imgDataChunkData.length, 4);
    const imgDataChunkType = "IDAT".split("").map(x => x.charCodeAt());
    const imgDataChunkCrc = calculateCRC([
      imgDataChunkType,
      imgDataChunkData
    ].flat(Infinity));
    const imgDataChunk = [
      imgDataChunkLenght,
      imgDataChunkType,
      imgDataChunkData,
      imgDataChunkCrc
    ].flat(Infinity);

    const imgTrailerChunk = [
      0,
      "IEND".split("").map(x => x.charCodeAt),
      [0, 0, 0, 0]
    ].flat(Infinity);

    const data = new Uint8Array(
      pngSignature.length +
      imageHeaderChunk.length +
      imgDataChunk.length +
      imgTrailerChunk.length
    );

    data.set(pngSignature, 0);
    data.set(imageHeaderChunk, pngSignature.length);
    data.set(imgDataChunk, pngSignature.length + imageHeaderChunk.length);
    data.set(imgTrailerChunk,
      pngSignature.length +
      imageHeaderChunk.length +
      imgDataChunk.length);


    return new Blob([data], { type: "image/png" });
  }

  return {
    getGridX,
    getGridY,
    getEventXY,
    getPngBlob
  }
});
