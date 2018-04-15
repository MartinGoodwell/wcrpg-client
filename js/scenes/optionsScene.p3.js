let gameScene = new Phaser.Scene('Title');

var imageArray;
var hotspotArray = [];
var textArray;
var visibleSprites = [];

gameScene.preload = function() {
//    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    
    this.loadHotspots(4);
    this.loadTexts(4);
    this.loadImages(4);
}

gameScene.loadHotspots = function(blockNumber) {
    let hotspots = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Chunks.HotRectangleGroup.StructureChunk["StructureChunk.Items"].HotRectangleItem;
    hotspots.forEach(function(entry) {
        hotspotArray[Number(entry._Identifier)] = entry._Bounds;
    });
    //console.log(hotspotArray);
}

gameScene.loadTexts = function(blockNumber) {
    textArray = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Chunks.HotTextGroup.SymbolChunk["SymbolChunk.Items"].SymbolItem;
    //console.log(textArray);
}

gameScene.loadImages = function(blockNumber) {

    imageArray = options.VgaFile.ImageBlock[blockNumber].ImageBlock_Items.WC1_ImageItem;
    for (let imgIdx=0;imgIdx<imageArray.length;++imgIdx) {
      let entry = imageArray[imgIdx];
      this.load.image(entry._file, '/assets/images/' + entry._file);
    }
}

gameScene.create = function() {
    this.addImg(imageArray[0]._file, 0, true);
    for (let i=1;i<4;++i) {
        this.addImg(imageArray[i]._file, i, false);
    }

}

gameScene.addImg = function(filename, index, showImage) {
    let origin = hotspotArray[index].split(" ")[0];
    let xPos = Number(origin.split(",")[0]);
    let yPos = Number(origin.split(",")[1]);

    let image;
    if (showImage) {
        image = this.add.image(xPos, yPos, filename).setOrigin(0,0).setInteractive();

        image.on('pointerover', function (event, gameObjects) {
          if (visibleSprites.length == 0) {
            return;
          }

          visibleSprites.forEach(function(visibleSprite) {
            visibleSprite.visible = false;
          })
          visibleSprites = [];
        });

    } else {
        image = this.add.sprite(xPos, yPos, filename).setInteractive().setOrigin(0,0);
    
        image.on('pointerdown', function (event, gameObjects) {
            console.log("clicked image");
        });

        let origin2 = hotspotArray[index].split(" ")[1];
        let width = Number(origin2.split(",")[0]) - xPos;
        let height = Number(origin2.split(",")[1]) - yPos;

        let zone = this.add.zone(xPos, yPos, width, height).setName(textArray[index]).setInteractive();
        zone.on('pointerover', function(event, gameObjects) {
          image.visible = true;
          visibleSprites.push(image);
        });
        zone.on('pointerdown', function (event, gameObjects) {
          //gameScene.handleZoneClick(index);
      });
    }
    image.visible = showImage;
}

gameScene.handleZoneClick = function(index) {
  switch (index) {
    case 1:
      console.log("go to briefing")
      break;
    case 2:
      console.log("cinema");
      break;
    case 3:
      console.log("loadsave")
      break;
  }
}

gameScene.update = function() {
}

options = {
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

  let config = {
    type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
    width: 320, // game width
    height: 200, // game height
    scene: gameScene // our newly created scene
  };
  var game = new Phaser.Game(config);
  