var game = new Phaser.Game(640, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var imageArray;
var hotspotArray = [];
var textArray;
var imageHotspot = [];

function preload() {
    //game.load.json('options', '/assets/resources/options.v00.json');
    //console.log(optionsResponse);

    //let optionsJSON = game.cache.getJSON('options');
    //let optionsJSON = JSON.parse(optionsResponse);
    
    loadHotspots(0);
    loadTexts(0);
    loadImages(0);
}

function loadHotspots(blockNumber) {
    let hotspots = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Chunks.HotRectangleGroup.StructureChunk["StructureChunk.Items"].HotRectangleItem;
    hotspots.forEach(function(entry) {
        hotspotArray[Number(entry._Identifier)] = entry._Bounds;
    });
    //console.log(hotspotArray);
}

function loadTexts(blockNumber) {
    textArray = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Chunks.HotTextGroup.SymbolChunk["SymbolChunk.Items"].SymbolItem;
    //console.log(textArray);
}

function loadImages(blockNumber) {
    imageArray = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Items.WC1_ImageItem;
    imageArray.forEach(function(entry) {
        game.load.image(entry._file, '/assets/images/' + entry._file);
    });
}

function create() {
    game.input.mouse.capture = true;

    addImg(imageArray[0]._file, 0, true);
    for (let i=1;i<4;++i) {
        addImg(imageArray[i]._file, i, false);
    }
}

function addImg(filename, index, showImage) {
    let origin = hotspotArray[index].split(" ")[0];
    let xPos = Number(origin.split(",")[0]);
    let yPos = Number(origin.split(",")[1]);

    let image;
    if (showImage) {
        image = game.add.image(xPos, yPos, filename);
    } else {
        image = game.add.sprite(xPos, yPos, filename);

        image.inputEnabled = true;
        image.events.onInputOver.add(hotspotOver, this);
        //image.events.onInputOut.add(hotspotOut, this);
        image.events.onInputDown.add(imageDown, this);

        let origin2 = hotspotArray[index].split(" ")[1];
        let width = Number(origin2.split(",")[0]) - xPos;
        let height = Number(origin2.split(",")[1]) - yPos;
        
        imageHotspot.push(image);
    }
    image.visible = showImage;
}

function imageDown() {
    console.log("down");    
}

function hotspotOver(pointer) {
    console.log(pointer);
//    pointer.visible = true;
//    console.log(pointer.event);
}
/*
function hotspotOut(pointer) {
    pointer.visible = false;
    console.log(pointer.event);
}
*/
function update() {
    /*
    imageHotspot.forEach(function(image) {
        if (image.input.pointerOver()) {
            image.visible = true;
        } else {
            image.visible = false;
        }
    });
    */
}

var options = {
    "VgaFile": {
      "_xmlns": "http://www.wctoolbox.com/2017/WC2",
      "_xmlns:WC1": "http://www.wctoolbox.com/2017/WC1",
      "ImageBlock": [
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "64,64 106,130",
                      "_Identifier": "4"
                    },
                    {
                      "_Bounds": "0,99 39,124",
                      "_Identifier": "3"
                    },
                    {
                      "_Bounds": "245,69 316,136",
                      "_Identifier": "2"
                    },
                    {
                      "_Bounds": "131,74 181,128",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": [
                    { "_Text": "Fly mission" },
                    { "_Text": "View storyline" },
                    { "_Text": "Save/Load game" },
                    { "_Text": "Exit to DOS" }
                  ]
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock000-ImageItem000.png"
              },
              {
                "_Origin": "0,54",
                "_file": "OPTIONS.V00-ImageBlock000-ImageItem001.png"
              },
              {
                "_Origin": "0,67",
                "_file": "OPTIONS.V00-ImageBlock000-ImageItem002.png"
              },
              {
                "_Origin": "0,16",
                "_file": "OPTIONS.V00-ImageBlock000-ImageItem003.png"
              }
            ]
          }
        },
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "240,19 253,32",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": { "_Text": "Switch off computer" }
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock001-ImageItem000.png"
              },
              {
                "_Origin": "0,115",
                "_file": "OPTIONS.V00-ImageBlock001-ImageItem001.png"
              }
            ]
          }
        },
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "64,64 106,130",
                      "_Identifier": "4"
                    },
                    {
                      "_Bounds": "0,99 39,124",
                      "_Identifier": "3"
                    },
                    {
                      "_Bounds": "245,69 316,136",
                      "_Identifier": "2"
                    },
                    {
                      "_Bounds": "131,74 181,128",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": [
                    { "_Text": "Fly mission" },
                    { "_Text": "View storyline" },
                    { "_Text": "Save/Load game" },
                    { "_Text": "Exit to DOS" }
                  ]
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock003-ImageItem000.png"
              },
              {
                "_Origin": "0,54",
                "_file": "OPTIONS.V00-ImageBlock003-ImageItem001.png"
              },
              {
                "_Origin": "0,67",
                "_file": "OPTIONS.V00-ImageBlock003-ImageItem002.png"
              },
              {
                "_Origin": "0,16",
                "_file": "OPTIONS.V00-ImageBlock003-ImageItem003.png"
              }
            ]
          }
        },
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "240,19 253,32",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": { "_Text": "Switch off computer" }
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock004-ImageItem000.png"
              },
              {
                "_Origin": "0,115",
                "_file": "OPTIONS.V00-ImageBlock004-ImageItem001.png"
              }
            ]
          }
        },
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "110,61 164,140",
                      "_Identifier": "4"
                    },
                    {
                      "_Bounds": "86,81 104,105",
                      "_Identifier": "3"
                    },
                    {
                      "_Bounds": "235,73 285,150",
                      "_Identifier": "2"
                    },
                    {
                      "_Bounds": "0,60 74,139",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": [
                    { "_Text": "Fly mission" },
                    { "_Text": "View storyline" },
                    { "_Text": "Save/Load game" },
                    { "_Text": "Exit to DOS" }
                  ]
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock006-ImageItem000.png"
              },
              {
                "_Origin": "0,79",
                "_file": "OPTIONS.V00-ImageBlock006-ImageItem001.png"
              },
              {
                "_Origin": "0,77",
                "_file": "OPTIONS.V00-ImageBlock006-ImageItem002.png"
              },
              {
                "_Origin": "0,16",
                "_file": "OPTIONS.V00-ImageBlock006-ImageItem003.png"
              }
            ]
          }
        },
        {
          "ImageBlock_Chunks": {
            "HotRectangleGroup": {
              "StructureChunk": {
                "StructureChunk.Items": {
                  "HotRectangleItem": [
                    {
                      "_Bounds": "240,19 253,32",
                      "_Identifier": "1"
                    },
                    {
                      "_Bounds": "0,0 319,199",
                      "_Identifier": "0"
                    }
                  ]
                }
              }
            },
            "HotTextGroup": {
              "SymbolChunk": {
                "SymbolChunk.Items": {
                  "SymbolItem": { "_Text": "Switch off computer" }
                }
              }
            }
          },
          "ImageBlock_Items": {
            "WC1_ImageItem": [
              {
                "_Origin": "0,199",
                "_file": "OPTIONS.V00-ImageBlock007-ImageItem000.png"
              },
              {
                "_Origin": "0,115",
                "_file": "OPTIONS.V00-ImageBlock007-ImageItem001.png"
              }
            ]
          }
        }
      ]
    }
  };